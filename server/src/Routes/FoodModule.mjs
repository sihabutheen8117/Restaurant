import { Router } from "express";
import { verifyToken ,verifyTokenHelper , verifyAdmin } from "../middlewares/authmiddleware.mjs";
import { Foods } from "../mongoose/schema/Foods.mjs";
import { Orders } from "../mongoose/schema/Orders.mjs";
import { Users } from "../mongoose/schema/Users.mjs";
import { genAnonymousToken } from "../middlewares/authmiddleware.mjs";
import { v4 as uuidv4 } from 'uuid';
import { AnonymousUser } from "../mongoose/schema/AnonymousUser.mjs";

const FoodModuleRouter = new Router() ;

FoodModuleRouter.post( '/api/add_new_foods' ,
  verifyAdmin , 
  async(req , res )=> {
    const food_data = req.body;
    try{
        const newFood = await Foods({
            ...food_data
        })
        const saved_food = await newFood.save() 
        console.log(saved_food) ;
        res.status(200).send({
            level : "accepted" ,
            details : "new food was created successfully"
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({
            level : "error" ,
            details : "error in creating new foods"
        })
    }
})


FoodModuleRouter.get( '/api/get_all_categories' , async(req , res )=> {
    
  try{
      const all_categories = await Foods.distinct("category");
      return res.status(200).send(all_categories)
  } 
  catch(err)
  {
      console.log(err)
      res.status(400).send({
          level : "error" ,
          details : "error in retreiving all categories"
      })
  }
})



FoodModuleRouter.get( '/api/get_all_foods' , async(req , res )=> {
    
    try{
        const allFoods = await Foods.aggregate([
            { 
                $match: { isDisable : false }   
            },
            {
              $project: {
                food_id : 1 ,
                food_name: 1,   
                price: 1,
                food_image: 1,
                rating_stars: 1,
                offer_price : 1 ,
                category: 1,
                review_count: { $cond: {
                    if: { $isArray: '$reviews' },
                    then: { $size: '$reviews' },
                    else: 0
                  }}, 
                rating_count: { $cond: {
                    if: { $isArray: '$ratings' },
                    then: { $size: '$ratings' },
                    else: 0
                  }}, 
                describtion : 1 ,
                ingredients : 1 
              }
            }
          ]);
        res.status(200).send(allFoods)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({
            level : "error" ,
            details : "error in retreiving all foods"
        })
    }
})

FoodModuleRouter.get( '/api/get_all_foods_for_edit' , async(req , res )=> {
    
    try{
        const allFoods = await Foods.aggregate([
            {
              $project: {
                food_id : 1 ,
                food_name: 1,   
                price: 1,
                food_image: 1,
                rating_stars: 1,
                offer_price : 1 ,
                category: 1,
                review_count: { $cond: {
                    if: { $isArray: '$reviews' },
                    then: { $size: '$reviews' },
                    else: 0
                  }}, 
                  rating_count: { $cond: {
                    if: { $isArray: '$ratings' },
                    then: { $size: '$ratings' },
                    else: 0
                  }}, 
                  describtion : 1 ,
                  ingredients : 1 ,
                  isDisable : 1 ,
                  offer_validity : 1 ,
              }
            }
          ]);
        res.status(200).send(allFoods)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({
            level : "error" ,
            details : "error in retreiving all foods for edit"
        })
    }
})

FoodModuleRouter.delete( '/api/delete_food' , 
  verifyAdmin ,
  async(req , res )=> {

    const { _id } = req.body;
    try{
       const response = await Foods.findByIdAndDelete(_id);
       
       if (!response) {
            return res.status(404).json({
                errors: "Food not found or already deleted"
            });
        }

        return res.status(200).json({
            status: "Food deleted successfully"
        });
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({
            level : "error" ,
            details : "error in retreiving all foods"
        })
    }
})

FoodModuleRouter.post('/api/place_order' , async ( req , res ) => {
    const body = req.body.body;
    const token = req.cookies.authorization;

    console.log("place order user body")
    console.log(body) ;

    let user_id;
    let isAnon = false ;
    let user_obj_id  ;
    let user_name = req.body.user_name 

    if (!token) {

        try{

            isAnon = true ;
            const uniq_uuid = uuidv4()

            const newAnonymUser = new AnonymousUser({
                user_id : uniq_uuid ,
                user_name : req.body.user_name 
            })

            const response = await newAnonymUser.save() ;
            user_obj_id = response._id ;

            user_id = await genAnonymousToken({
                isAnonymous : true ,
                user_id: user_obj_id ,
                user_name : req.body.user_name ,
                isAdmin : false 
            });

            res.cookie("authorization" , user_id , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })
        }
        catch(error)
        {
            console.log(error);
            return res.status(400).send({
                level : "error" ,
                details : "errors in placing the orders"
            })
        }

       
    } else {
      
      const user_data = verifyTokenHelper(token) ;
      if(! user_data)
      {
        console.log(user_data)
        return res.status(401).send({
          level : "user not authendicated" ,
          details : ""
        })
      }

      console.log("user name ")
      console.log(user_data)
      user_id = user_data.user_id;
      isAnon = user_data.isAnonymous ;
      user_obj_id = user_data.user_id  ;
      user_name = user_data.user_name ;
    }

    try {

        const foodIds = body.map(item => item._id);
        const foods = await Foods.find({ _id : { $in: foodIds } });
        let food_quantity = 0 ;
        const total_cost = foods.reduce((acc, food) => {
            const matchingItem = body.find(item => item._id === String(food._id));
            const quantity = matchingItem?.quantity || 1; // default to 1
            const effectivePrice = food.offer_price == -1 ? food.price : food.offer_price ;
            food_quantity += quantity ;
            return acc + (effectivePrice * quantity);
          }, 0);
        
          const order_data = {
                user_name : user_name ,
                user_id : user_id ,
                ordered_foods : body ,
                quandity : food_quantity,
                total_cost : total_cost ,
                order_type : "online",
                order_status : "pending"
          }

          const orders = new Orders(order_data)
          const saved_order = await orders.save();

          //socket io implementation
          req.io.emit('order-received', {
              ...saved_order
            })
          //finished

          if(isAnon)
          {
            const rep = await AnonymousUser.findByIdAndUpdate(user_obj_id, {
                $push: {
                  order_id: saved_order._id
                }
            });    
          }
          else{
            console.log("Order saved to user account ") ;
            console.log(saved_order._id);
            const rep = await Users.findByIdAndUpdate(user_obj_id, {
              $push: {
                order_id: saved_order._id
              }
          });
          }

        res.status(200).send({
            status : "order placed successfully" 
        })

    }
    catch(error)
    {
        console.log(error);
        res.status(400).send({
            level : "error" ,
            details : "errors in placing the orders"
        })
    }

})


FoodModuleRouter.get('/api/my_orders', 
    verifyToken,
    async (req, res) => {

      try {
        console.log( req.user_data)
        let user ;
        if( req.user_data.isAnonymous )
        {
          user = await AnonymousUser.findOne({
            _id: req.user_data.user_id
          });
        }
        else{
          user = await Users.findOne({
            _id: req.user_data.user_id
          });
        }
        console.log(user)
        if (!user) {
          return res.status(404).send({
            status: "fail",
            message: "User not found"
          });
        }
        
        const order = await Orders.find({ _id: { $in: user.order_id } });

        return res.status(200).send(order); 
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        return res.status(200).send({
            status : "failed"
        }); 
      }
      
  });

  FoodModuleRouter.post('/api/get_food_details_whithout_reviews', 
    verifyToken,
    async (req, res) => {
      const food_data = req.body;
      try {

        const food_id = food_data.map( items => items._id );

        const foods_details = await Foods.find(
            { _id: { $in: food_id } },
            { description: 0,
            offer_validity : 0 ,
            ingredients : 0 ,
            reviews : 0 ,
            ratings : 0 ,
            rating_stars : 0 ,
            isDisable : 0 ,
            category : 0 ,
            orders : 0 ,
            food_image : 0
            } 
          );
          
          const final_food_data = foods_details.map(food => {
            const matched = food_data.find(item => item._id === food._id.toString());
            return {
              ...food.toObject(),
              quantity: matched?.quantity ?? 1
            };
          });
        res.status(200).send(final_food_data) ;
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(200).send({
            status : "failed"
        }); 
      }
      
  });

  

  FoodModuleRouter.post('/api/delete_orders', 
    verifyToken,
    async (req, res) => {

      const { _id }  = req.body;
     
      try {
        const response = await Orders.findByIdAndDelete( _id ) ;
        if(response)
        {
          req.io.emit('cancelled-orders', {
            ...response
          })
        }
        res.status(200).send({
          status : "order deleted successfully"

        }) ;
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(200).send({
            status : "failed"
        }); 
      }
      
  });
  
  

  FoodModuleRouter.get('/api/get_all_orders_details',
    verifyAdmin , 
    async (req, res) => {

      try {
        const results = await Orders.find({ order_status: 'pending' });
        if(! results )
        {
          return res.status(404).send({
            status : "can't fetch the orders"
          })
        }
        res.status(200).send(results);
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(200).send({
            status : "failed"
        }); 
      }
      
  });



  FoodModuleRouter.post('/api/get_food_details_for_orders', 
    async (req, res) => {
      const food_data = req.body;
      try {

        const food_id = food_data.map( items => items._id );

        const foods_details = await Foods.find(
            { _id: { $in: food_id } },
            { description: 0,
            offer_validity : 0 ,
            ingredients : 0 ,
            reviews : 0 ,
            ratings : 0 ,
            rating_stars : 0 ,
            isDisable : 0 ,
            category : 0 ,
            orders : 0 ,
            food_image : 0 
            } 
          );
          const final_food_data = foods_details.map(food => {
            const matched = food_data.find(item => item._id === food._id.toString());
            return {
              ...food.toObject(),
              quantity: matched?.quantity ?? 1
            };
          });
        res.status(200).send(final_food_data) ;
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(500).send({
            status : "failed"
        }); 
      }
      
  });


  FoodModuleRouter.post('/api/payment_checkout', 
    async (req, res) => {
      const { payment_type , _id } = req.body;
      try {
        const response = await Orders.findByIdAndUpdate( _id ,
          {
            payment_type : payment_type ,
            order_status : "paid"
          }
        )
        console.log("from checkout")
        console.log(response)

        res.status(200).send({
            status : "order checket out"
        }); 

        const checkout_foods = response.ordered_foods ;

        for (const item of checkout_foods) {
          const foodId = item._id;
          const quantity = item.quantity || 1;

          // Find the full food details from the 'foods' list fetched earlier
          const food = await Foods.findOne({ _id: item._id });
          if (!food) continue;

          const effectivePrice = food.offer_price === -1 ? food.price : food.offer_price;
          console.log(food)
          console.log(effectivePrice) ;
          console.log(food.offer_price)
          console.log(food.price)
          const totalItemCost = effectivePrice * quantity; 

          const updated_food = await Foods.findByIdAndUpdate(foodId, {
            $push: {
              orders: {
                order_id: _id ,
                order_date: response.createdAt ,
                quantity: quantity,
                total_cost: totalItemCost
              }
            }
          });

          console.log(updated_food)
        }

      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(404).send({
            status : "failed"
        }); 
      }
      
  });


  
  FoodModuleRouter.get('/api/get_served_orders',
    verifyAdmin , 
    async (req, res) => {

      try {
        const results = await Orders.find({ order_status: 'paid' });
        if(! results )
        {
          return res.status(404).send({
            status : "can't fetch the orders"
          })
        }
        res.status(200).send(results);
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(200).send({
            status : "failed"
        }); 
      }
      
  });

  FoodModuleRouter.get('/api/get_entry_orders',
    verifyAdmin ,
    async (req, res) => {

      try {
        const results = await Orders.find({ order_status: 'paid' , order_type : "offline"});
        if(! results )
        {
          return res.status(404).send({
            status : "can't fetch the orders"
          })
        }
        res.status(200).send(results);
      } catch (error) {
        console.error("Error in /api/my_orders:", error);
        res.status(200).send({
            status : "failed"
        }); 
      }
      
  });


  FoodModuleRouter.post('/api/update_food_details',
    verifyAdmin ,
    async (req, res) => {
      try {
        const { _id, ...food_data } = req.body;
        const response = await Foods.findByIdAndUpdate(
          _id,
          { $set: food_data },
          { new: true } // optional: return the updated document
        );
  
        if (!response) {
          return res.status(404).send({
            error: "Food not Found"
          });
        }
  
        return res.status(200).send({
          message: "Food updated successfully"
        });
  
      } catch (error) {
        console.error("Error in /api/update_food_details:", error);
        return res.status(500).send({
          error: "Internal server error"
        });
      }
  });


  
  FoodModuleRouter.get('/api/manual_entry/get_foods',
    verifyAdmin ,
    async (req, res) => {
      try {
        const foods = await Foods.find(
          { isDisable: false },
          {
            food_name: 1,
            price: 1,
            offer_price: 1
          }
        );
        res.status(200).json(foods);
      } catch (error) {
        console.error("Error in /api/manual_entry/get_foods:", error);
        return res.status(500).send({
          error: "Internal server error"
        });
      }
  });


  FoodModuleRouter.post('/api/place_entry' , 
    verifyAdmin ,
    async ( req , res ) => { 

    try {
        
          const order_data = {
                user_name : req.body.user_name ,
                user_id : uuidv4() ,
                ordered_foods : req.body.order_data,
                quandity : req.body.quandity ,
                total_cost : req.body.total_cost ,
                order_type : "offline",
                order_status : "paid" ,
                payment_type : req.body.payment_type
          }

          const orders = new Orders(order_data)
          const saved_order = await orders.save();

        res.status(200).send({
            status : "placing entry is successful" 
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send({
            level : "error" ,
            details : "errors in placing the entries"
        })
    }

})



FoodModuleRouter.post('/api/user_ratings', 
  verifyToken,
  async (req, res) => { 
    try {
      const new_review = req.body;
      const user_data = req.user_data;
      
      // Debug: Check user_data
      console.log("User data:", user_data);
      
      // Validate user data
      const { user_id, user_name } = user_data;
      if (!user_id || !user_name) {
        console.log("Missing user credentials:", { user_id, user_name });
        return res.status(400).send({
          level: "error",
          details: "Missing user credentials"
        });
      }

      // Validate request body
      if (!new_review.reviews || !Array.isArray(new_review.reviews) || new_review.reviews.length === 0) {
        return res.status(400).send({
          level: "error",
          details: "Invalid reviews data"
        });
      }

      const bulkOps = [];

      // Build bulk operations for Foods collection
      for (const review of new_review.reviews) {
        if (!review.food_id || !review.stars) {
          console.log("Invalid review data:", review);
          continue;
        }

        bulkOps.push({
          updateOne: {
            filter: { _id: review.food_id },
            update: {
              $push: {
                ratings: {
                  user_id,
                  user_name,
                  stars: review.stars,
                }
              }
            }
          }
        });
      }

      // Execute bulk operations only if we have valid operations
      if (bulkOps.length === 0) {
        return res.status(400).send({
          level: "error",
          details: "No valid reviews to process"
        });
      }

      // Update Foods collection with new ratings
      const food_res = await Foods.bulkWrite(bulkOps);
      console.log("Foods bulk write result:", food_res);

      // Update Orders collection
      const order_res = await Orders.updateOne(
        { 
          _id: new_review.order_id,
          isRated: false 
        },
        {
          $push: {
            ratings: {
              $each: new_review.reviews.map(review => ({
                food_id: review.food_id,
                food_name: review.food_name,
                stars: review.stars
              }))
            }
          },
          $set: {
            isRated: true 
          }
        }
      );
      console.log("Order update result:", order_res);

      // Calculate and update average ratings for affected foods using updateOne
      const foodIds = new_review.reviews.map(r => r.food_id);
      
      const averageUpdatePromises = foodIds.map(async (foodId) => {
        // Get the updated food to calculate average
        const food = await Foods.findById(foodId);
        
        if (food && food.ratings && food.ratings.length > 0) {
          const totalStars = food.ratings.reduce((acc, rating) => acc + rating.stars, 0);
          const avgStars = totalStars / food.ratings.length;
          const roundedAvg = parseFloat(avgStars.toFixed(2));
          
          // Use updateOne to avoid validation issues with existing data
          return await Foods.updateOne(
            { _id: foodId },
            { $set: { rating_stars: roundedAvg } }
          );
        }
        return null;
      });

      const averageUpdateResults = await Promise.all(averageUpdatePromises);
      console.log("Updated foods with average ratings:", averageUpdateResults.filter(r => r !== null).length);

      // Send success response
      res.status(200).send({
        status: "Successful",
        message: "Ratings submitted successfully",
        data: {
          foods_updated: food_res.modifiedCount,
          order_updated: order_res.modifiedCount > 0
        }
      });

    } catch (error) {
      console.error("Error in user ratings:", error);
      
      // Only send error response if headers haven't been sent already
      if (!res.headersSent) {
        res.status(500).send({
          level: "error",
          details: "Error processing user ratings",
          message: error.message
        });
      }
    }
  }
);
  

export default FoodModuleRouter ;