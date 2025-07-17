import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";
import { Users } from "../mongoose/schema/Users.mjs";
import { Foods } from "../mongoose/schema/Foods.mjs";
import { Orders } from "../mongoose/schema/Orders.mjs";

const AnalyticsRouter = Router() ;


AnalyticsRouter.get( "/api/get_countables" , 
    async(req , res ) => {
        try{
          const total_menu = await Foods.countDocuments();
          const total_orders = await Orders.countDocuments() ;
          
          const result = await Orders.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$total_cost" } } }
          ]);
      
          const total_sales = result[0]?.totalSales || 0;
          res.status(200).send(
            {
              total_menu : total_menu,
              total_orders : total_orders ,
              total_sales : total_sales
            }
          )
        }
        catch(error){
            console.log(error)
            res.status(501).send({
                error : error
            })
        }
    }
)


AnalyticsRouter.post( "/api/get_dashboard_analytics_orders_customers" , 
  async(req , res ) => {
    try {
      const range = parseInt( req.body.user_data.range || '1' ) ;
      const now = new Date();
      let startDate = new Date();
  
      if (range === 1) {
        startDate.setMonth(now.getMonth() - 1);
      } else {
        startDate.setMonth(now.getMonth() - range);
      }
  
      // Choose grouping level
      const groupBy =
        range === 1
          ? {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            }
          : {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            };
  
      const rawData = await Users.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: groupBy,
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
      ]);

      console.log("Raw data")
      console.log(rawData)
      
      // Format for chart
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
      const labels = [];
      const data = [];
  
      for (const item of rawData) {
        const { year, month, day } = item._id;
  
        if (range === 1) {
          // daily format: 'YYYY-MM-DD'
          const label = `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}`;
          labels.push(label);
        } else {
          // monthly format: 'Mon YYYY'
          const label = `${months[month - 1]} ${year}`;
          labels.push(label);
        }
  
        data.push(item.count);
      }

      console.log(labels)
  
      return res.json({
        labels,
        datasets: [
          {
            label: 'New Customers',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
            borderRadius: 8
          }
        ]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
)

export default AnalyticsRouter;