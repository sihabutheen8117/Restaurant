import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";
import { Users } from "../mongoose/schema/Users.mjs";
import { Foods } from "../mongoose/schema/Foods.mjs";
import { Orders } from "../mongoose/schema/Orders.mjs";
import { AnonymousUser } from "../mongoose/schema/AnonymousUser.mjs";
import xlsx from 'xlsx';
import mongoose from 'mongoose'

const MainAnalytics = Router() ;

MainAnalytics.get('/users/overview', async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalAdmins = await Users.countDocuments({ isAdmin: true });
    const totalCustomers = await Users.countDocuments({ isAdmin: false });
    const totalAnonymousUsers = await AnonymousUser.countDocuments();

    // User registration trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentUsers = await Users.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Users with orders vs without orders
    const usersWithOrders = await Users.countDocuments({
      order_id: { $exists: true, $not: { $size: 0 } }
    });

    res.json({
      totalUsers,
      totalAdmins,
      totalCustomers,
      totalAnonymousUsers,
      recentUsers,
      usersWithOrders,
      usersWithoutOrders: totalCustomers - usersWithOrders,
      userGrowthRate: totalUsers > 0 ? (recentUsers / totalUsers * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/users/registration-trends
MainAnalytics.get('/users/registration-trends', async (req, res) => {
  try {
    const { period = 'month' } = req.query; // day, week, month, year
    
    let groupBy, dateFormat;
    switch (period) {
      case 'day':
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'week':
        groupBy = { $dateToString: { format: "%Y-W%U", date: "$createdAt" } };
        break;
      case 'year':
        groupBy = { $dateToString: { format: "%Y", date: "$createdAt" } };
        break;
      default: // month
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
    }

    const registrationTrends = await Users.aggregate([
      {
        $group: {
          _id: groupBy,
          totalRegistrations: { $sum: 1 },
          adminRegistrations: {
            $sum: { $cond: [{ $eq: ["$isAdmin", true] }, 1, 0] }
          },
          customerRegistrations: {
            $sum: { $cond: [{ $eq: ["$isAdmin", false] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(registrationTrends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/users/activity
MainAnalytics.get('/users/activity', async (req, res) => {
  try {
    // Most active users (by order count)
    const activeUsers = await Users.aggregate([
      {
        $addFields: {
          orderCount: { $size: { $ifNull: ["$order_id", []] } }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
      {
        $project: {
          user_name: 1,
          user_email: 1,
          orderCount: 1,
          createdAt: 1
        }
      }
    ]);

    // User activity distribution
    const activityDistribution = await Users.aggregate([
      {
        $addFields: {
          orderCount: { $size: { $ifNull: ["$order_id", []] } }
        }
      },
      {
        $bucket: {
          groupBy: "$orderCount",
          boundaries: [0, 1, 5, 10, 20, 50],
          default: "50+",
          output: {
            count: { $sum: 1 },
            users: { $push: "$user_name" }
          }
        }
      }
    ]);

    res.json({
      mostActiveUsers: activeUsers,
      activityDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// FOODS ANALYTICS ROUTES
// =============================================================================

// GET /api/analytics/foods/overview
MainAnalytics.get('/foods/overview', async (req, res) => {
  try {
    const totalFoods = await Foods.countDocuments();
    const activeFoods = await Foods.countDocuments({ isDisable: { $ne: true } });
    const disabledFoods = await Foods.countDocuments({ isDisable: true });
    
    // Foods with offers
    const foodsWithOffers = await Foods.countDocuments({
      offer_price: { $exists: true, $ne: null },
      offer_validity: { $gte: new Date() }
    });

    // Average ratings
    const avgRatingResult = await Foods.aggregate([
      { $match: { rating_stars: { $exists: true } } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating_stars" },
          totalRatedFoods: { $sum: 1 }
        }
      }
    ]);

    // Category distribution
    const categoryDistribution = await Foods.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Price analysis
    const priceAnalysis = await Foods.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          totalFoods: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalFoods,
      activeFoods,
      disabledFoods,
      foodsWithOffers,
      averageRating: avgRatingResult[0]?.averageRating || 0,
      totalRatedFoods: avgRatingResult[0]?.totalRatedFoods || 0,
      categoryDistribution,
      priceAnalysis: priceAnalysis[0] || {}
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/foods/popular
MainAnalytics.get('/foods/popular', async (req, res) => {
  try {
    // Most ordered foods
    const popularFoods = await Foods.aggregate([
      {
        $addFields: {
          totalOrders: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.quantity"] }
            }
          }
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 },
      {
        $project: {
          food_name: 1,
          price: 1,
          rating_stars: 1,
          category: 1,
          totalOrders: 1
        }
      }
    ]);

    // Best rated foods
    const bestRatedFoods = await Foods.find({
      rating_stars: { $exists: true }
    })
    .sort({ rating_stars: -1 })
    .limit(10)
    .select('food_name price rating_stars category reviews');

    // Most reviewed foods
    const mostReviewedFoods = await Foods.aggregate([
      {
        $addFields: {
          reviewCount: { $size: { $ifNull: ["$reviews", []] } }
        }
      },
      { $sort: { reviewCount: -1 } },
      { $limit: 10 },
      {
        $project: {
          food_name: 1,
          rating_stars: 1,
          reviewCount: 1,
          category: 1
        }
      }
    ]);

    res.json({
      popularFoods,
      bestRatedFoods,
      mostReviewedFoods
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/foods/performance
MainAnalytics.get('/foods/performance', async (req, res) => {
  try {
    // Foods performance metrics
    const foodsPerformance = await Foods.aggregate([
      {
        $addFields: {
          totalOrders: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.quantity"] }
            }
          },
          totalRevenue: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: { $add: ["$$value", { $multiply: ["$$this.quantity", "$price"] }] }
            }
          },
          reviewCount: { $size: { $ifNull: ["$reviews", []] } }
        }
      },
      {
        $project: {
          food_name: 1,
          category: 1,
          price: 1,
          rating_stars: 1,
          totalOrders: 1,
          totalRevenue: 1,
          reviewCount: 1,
          isDisable: 1
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    // Category performance
    const categoryPerformance = await Foods.aggregate([
      {
        $addFields: {
          totalOrders: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.quantity"] }
            }
          },
          totalRevenue: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: { $add: ["$$value", { $multiply: ["$$this.quantity", "$price"] }] }
            }
          }
        }
      },
      {
        $group: {
          _id: "$category",
          foodCount: { $sum: 1 },
          totalOrders: { $sum: "$totalOrders" },
          totalRevenue: { $sum: "$totalRevenue" },
          avgRating: { $avg: "$rating_stars" }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json({
      foodsPerformance,
      categoryPerformance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// ORDERS ANALYTICS ROUTES
// =============================================================================

// GET /api/analytics/orders/overview
MainAnalytics.get('/orders/overview', async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();
    
    // Order status distribution
    const statusDistribution = await Orders.aggregate([
      { $group: { _id: "$order_status", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Order type distribution
    const typeDistribution = await Orders.aggregate([
      { $group: { _id: "$order_type", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Payment type distribution
    const paymentDistribution = await Orders.aggregate([
      {
        $group: {
          _id: "$payment_type",
          count: { $sum: 1 }
        }
      }
    ]);

    // Revenue metrics
    const revenueMetrics = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_cost" },
          avgOrderValue: { $avg: "$total_cost" },
          totalQuantity: { $sum: "$quandity" }
        }
      }
    ]);

    // Recent orders (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentOrders = await Orders.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentRevenue = await Orders.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } , 
                order_status : "paid" } },
      { $group: { _id: null, revenue: { $sum: "$total_cost" } } }
    ]);

    res.json({
      totalOrders,
      statusDistribution,
      typeDistribution,
      paymentDistribution,
      revenueMetrics: revenueMetrics[0] || {},
      recentOrders,
      recentRevenue: recentRevenue[0]?.revenue || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/orders/trends
MainAnalytics.get('/orders/trends', async (req, res) => {
  try {
    const { period = 'day' } = req.query;
    
    let groupBy;
    switch (period) {
      case 'hour':
        groupBy = { $dateToString: { format: "%Y-%m-%d-%H", date: "$createdAt" } };
        break;
      case 'week':
        groupBy = { $dateToString: { format: "%Y-W%U", date: "$createdAt" } };
        break;
      case 'month':
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default: // day
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }

    const orderTrends = await Orders.aggregate([
      {
        $group: {
          _id: groupBy,
          orderCount: { $sum: 1 },
          totalRevenue: { $sum: "$total_cost" },
          avgOrderValue: { $avg: "$total_cost" },
          totalQuantity: { $sum: "$quandity" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Peak hours analysis
    const peakHours = await Orders.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          orderCount: { $sum: 1 },
          totalRevenue: { $sum: "$total_cost" }
        }
      },
      { $sort: { orderCount: -1 } }
    ]);

    res.json({
      orderTrends,
      peakHours
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/orders/customer-insights
MainAnalytics.get('/orders/customer-insights', async (req, res) => {
  try {
    // Top customers by order count
    const topCustomersByCount = await Orders.aggregate([
      { $group: { _id: "$user_id", orderCount: { $sum: 1 }, userName: { $first: "$user_name" } } },
      { $sort: { orderCount: -1 } },
      { $limit: 10 }
    ]);

    // Top customers by revenue
    const topCustomersByRevenue = await Orders.aggregate([
      {
        $group: {
          _id: "$user_id",
          totalSpent: { $sum: "$total_cost" },
          orderCount: { $sum: 1 },
          userName: { $first: "$user_name" }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ]);

    // Customer behavior analysis
    const customerBehavior = await Orders.aggregate([
      {
        $group: {
          _id: "$user_id",
          orderCount: { $sum: 1 },
          totalSpent: { $sum: "$total_cost" },
          avgOrderValue: { $avg: "$total_cost" }
        }
      },
      {
        $bucket: {
          groupBy: "$orderCount",
          boundaries: [1, 2, 5, 10, 20],
          default: "20+",
          output: {
            customerCount: { $sum: 1 },
            avgSpending: { $avg: "$totalSpent" }
          }
        }
      }
    ]);

    res.json({
      topCustomersByCount,
      topCustomersByRevenue,
      customerBehavior
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics/orders/food-analysis
MainAnalytics.get('/orders/food-analysis', async (req, res) => {
  try {
    // Most ordered foods from orders collection
    const mostOrderedFoods = await Orders.aggregate([
      { $unwind: "$ordered_foods" },
      {
        $group: {
          _id: "$ordered_foods._id",
          totalQuantity: { $sum: "$ordered_foods.quantity" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 }
    ]);

    // Order composition analysis
    const orderComposition = await Orders.aggregate([
      {
        $addFields: {
          itemCount: { $size: "$ordered_foods" }
        }
      },
      {
        $bucket: {
          groupBy: "$itemCount",
          boundaries: [1, 2, 3, 5, 10],
          default: "10+",
          output: {
            orderCount: { $sum: 1 },
            avgOrderValue: { $avg: "$total_cost" }
          }
        }
      }
    ]);

    res.json({
      mostOrderedFoods,
      orderComposition
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








//////////////////////


MainAnalytics.post('/download-orders', async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    // Convert dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    console.log(`Fetching orders from ${start} to ${end}`);

    // Fetch paid orders within the date range
    const orders = await Orders.find({
      payment_type: true, // Only paid orders
      createdAt: {
        $gte: start,
        $lte: end
      }
    }).sort({ createdAt: -1 });

    console.log(`Found ${orders.length} paid orders`);

    if (orders.length === 0) {
      return res.status(404).json({ error: 'No paid orders found in the specified date range' });
    }

    // Prepare data for Excel
    const excelData = [];

    for (const order of orders) {
      // Get user details
      let userName = order.user_name || 'Anonymous User';
      let userEmail = 'N/A';
      
      // Try to get user details from Users collection
      if (order.user_id) {
        try {
          // Check if user_id is a valid MongoDB ObjectId (24 hex characters)
          const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(order.user_id);
          
          if (isValidObjectId) {
            // Query Users collection for registered users
            const user = await Users.findById(order.user_id);
            if (user) {
              userName = user.user_name;
              userEmail = user.user_email;
            }
          } else {
            // For UUID strings, check AnonymousUser collection
            const anonymousUser = await AnonymousUser.findOne({ user_id: order.user_id });
            if (anonymousUser) {
              userName = 'Anonymous User';
              userEmail = 'Anonymous';
            } else {
              // Fallback for any other string format
              userName = 'Guest User';
              userEmail = 'N/A';
            }
          }
        } catch (userError) {
          console.error(`Error fetching user details for ${order.user_id}:`, userError);
          userName = 'Unknown User';
          userEmail = 'N/A';
        }
      }

      // Process each food item in the order
      for (const orderedFood of order.ordered_foods) {
        try {
          const food = await Foods.findById(orderedFood._id);
          
          const rowData = {
            'Order ID': order._id,
            'Order Date': order.createdAt.toLocaleDateString(),
            'Order Time': order.createdAt.toLocaleTimeString(),
            'User ID': order.user_id || 'Anonymous',
            'User Name': userName,
            'User Email': userEmail,
            'Food ID': orderedFood._id,
            'Food Name': food ? food.food_name : 'Unknown Food',
            'Food Description': food ? food.describtion : 'N/A',
            'Food Category': food ? food.category : 'N/A',
            'Unit Price': food ? food.price : 0,
            'Offer Price': food ? (food.offer_price || 'N/A') : 'N/A',
            'Quantity Ordered': orderedFood.quantity,
            'Item Total': food ? (food.price * orderedFood.quantity) : 0,
            'Order Total': order.total_cost,
            'Order Type': order.order_type,
            'Payment Status': order.payment_type ? 'Paid' : 'Pending',
            'Order Status': order.order_status,
            'Total Items in Order': order.quandity
          };
          
          excelData.push(rowData);
        } catch (foodError) {
          console.error(`Error fetching food details for ${orderedFood._id}:`, foodError);
          // Add row with unknown food details
          const rowData = {
            'Order ID': order._id,
            'Order Date': order.createdAt.toLocaleDateString(),
            'Order Time': order.createdAt.toLocaleTimeString(),
            'User ID': order.user_id || 'Anonymous',
            'User Name': userName,
            'User Email': userEmail,
            'Food ID': orderedFood._id,
            'Food Name': 'Unknown Food',
            'Food Description': 'N/A',
            'Food Category': 'N/A',
            'Unit Price': 0,
            'Offer Price': 'N/A',
            'Quantity Ordered': orderedFood.quantity,
            'Item Total': 0,
            'Order Total': order.total_cost,
            'Order Type': order.order_type,
            'Payment Status': 'Paid',
            'Order Status': order.order_status,
            'Total Items in Order': order.quandity
          };
          
          excelData.push(rowData);
        }
      }
    }

    // Create workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(excelData);

    // Auto-size columns
    const columnWidths = [];
    const headers = Object.keys(excelData[0] || {});
    
    headers.forEach((header, index) => {
      let maxWidth = header.length;
      excelData.forEach(row => {
        const cellValue = row[header] ? row[header].toString() : '';
        maxWidth = Math.max(maxWidth, cellValue.length);
      });
      columnWidths.push({ wch: Math.min(maxWidth + 2, 50) }); // Max width of 50 characters
    });
    
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders Report');

    // Generate Excel file buffer
    const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Create filename with date range
    const startDateStr = start.toISOString().split('T')[0];
    const endDateStr = end.toISOString().split('T')[0];
    const filename = `orders_report_${startDateStr}_to_${endDateStr}.xlsx`;

    // Set response headers for file download
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': excelBuffer.length
    });

    console.log(`Generated Excel file with ${excelData.length} rows`);

    // Send the Excel file
    res.send(excelBuffer);

  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).json({ 
      error: 'Failed to generate Excel file',
      details: error.message 
    });
  }
});

// Summary endpoint to get order statistics
MainAnalytics.post('/orders-summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Get summary statistics
    const totalOrders = await Orders.countDocuments({
      payment_type: true,
      createdAt: { $gte: start, $lte: end }
    });

    const totalRevenue = await Orders.aggregate([
      {
        $match: {
          payment_type: true,
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total_cost' }
        }
      }
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    res.json({
      totalOrders,
      totalRevenue: revenue,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });

  } catch (error) {
    console.error('Error getting orders summary:', error);
    res.status(500).json({ 
      error: 'Failed to get orders summary',
      details: error.message 
    });
  }
});


export default MainAnalytics ; 