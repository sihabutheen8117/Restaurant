import { Router } from "express";
import { Users } from "../mongoose/schema/Users.mjs";
import { Orders } from '../mongoose/schema/Orders.mjs'
import { Foods } from "../mongoose/schema/Foods.mjs";

const SettingsRouter =Router() ;


SettingsRouter.get( "/api/settings/get_data" , async (req , res) => {
    try{
        const [result, is_all_disabled ] = await Promise.all([
            Foods.aggregate([
            {
              $group: {
                _id: "$category",
                totalCount: { $sum: 1 },
                disabledCount: {
                  $sum: {
                    $cond: [{ $eq: ["$isDisable", true] }, 1, 0]
                  }
                }
              }
            },
            {
              $project: {
                category: "$_id",
                count: "$totalCount",
                allFoodsDisabled: {
                  $eq: ["$totalCount", "$disabledCount"]
                },
                _id: 0
              }
            }
          ]),
          Foods.countDocuments({ isDisable: { $ne: true } }) 
        ]);
        const food_count = await Foods.countDocuments()
        const uncheck_order_count = await Orders.find({    
            order_status : "pending"
        })

        res.status(200).json({
            uncheck_order_count : uncheck_order_count.length ,
            categories : result ,
            food_count : food_count ,
            is_all_disabled : is_all_disabled === 0
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})


SettingsRouter.post( "/api/settings/food_management" , async (req , res ) => {
    try{
        const { all_disabled , disabled_cate } = req.body ; 
        const enabled_count = await Foods.countDocuments({ isDisable: { $ne: true } }) ;
        const is_all_disabled = enabled_count === 0 ;

        if( all_disabled != is_all_disabled )
        {
            const foods = await Foods.updateMany(
                {},
                { $set: { isDisable: all_disabled } }
            )
            console.log(foods) ;
            return res.status(200).send({
                status : "successfully changed"
            })
        }

        for( const foods of disabled_cate)
        {
            const food = await Foods.updateMany(
                {
                    category : foods.category 
                },
                {
                    $set: { isDisable: foods.allFoodsDisabled} 
                }
            )
            console.log( food ) ;
        }
        return res.status(200).send({
            status : "successfully changed"
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})

SettingsRouter.post( "/api/settings/pricing" , async (req , res ) => {
    try{
        const { type , price } = req.body ;
        console.log(type)
        console.log(price) 
        if( type == "per" )
        {
            const multiplier = 1 + (price / 100);
            const updated = await Foods.updateMany({}, { $mul: { price: multiplier } });
            console.log(updated)
            return res.status(200).send({
                status : "successfully price updated"
            })
        }
     
        const updated = await Foods.updateMany({}, { $inc: { price: price } });
        console.log(updated)
        
        return res.status(200).send({
            status : "successfully price updated"
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})


SettingsRouter.post( "/api/settings/delete_unchecked_orders" , async (req , res ) => {
    try{
        const delete_orders = await Orders.deleteMany({
            order_status : "pending"
        })
        console.log(delete_orders) ;
        res.status(200).send({
            status : "order deleted successfully"
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})


SettingsRouter.post( "/api/settings/content_management" , async (req , res ) => {
    try{

    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})

SettingsRouter.post( "/api/settings/system_reset" , async (req , res ) => {
    try{

    }
    catch(err)
    {
        console.log(err) ;
        res.status(500).send({
            status : {err}
        })
    }
})

export default SettingsRouter;