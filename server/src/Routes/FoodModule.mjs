import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.mjs";
import { Foods } from "../mongoose/schema/Foods.mjs";

const FoodModuleRouter = new Router() ;

FoodModuleRouter.post( '/api/add_new_foods' , async(req , res )=> {
    const food_data = req.body ;

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
                  isDisable : 1 
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

FoodModuleRouter.delete( '/api/delete_food' , async(req , res )=> {

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


export default FoodModuleRouter ;