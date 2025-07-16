import mongoose from 'mongoose'

const OrderFoodSchema = mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.String,
        required : true ,
    } ,
    quantity : {
        type : mongoose.Schema.Types.Number ,
        required : true 
    }
})

const OrdersSchema = mongoose.Schema({

    order_date : {
        type : mongoose.Schema.Types.Date,
        default : Date.now ,
        required : true 
    },
    ordered_foods : [
        OrderFoodSchema
    ],
    user_id : 
    {
        type : mongoose.Schema.Types.String,
        required : true ,
    },
    user_name : 
    {
        type : mongoose.Schema.Types.String,
    },
    quandity : {
        type : mongoose.Schema.Types.Number ,
        required : true
    },
    total_cost : {
        type : mongoose.Schema.Types.Number ,
        required : true
    },
    order_type : {
        type : mongoose.Schema.Types.String ,
        required : true
    },
    payment_type : {
        type : mongoose.Schema.Types.String 
    },
    order_status : {
        type : mongoose.Schema.Types.String ,
        required : true
    },
    user_name : {
        type : mongoose.Schema.Types.String
    }
})

export const Orders = mongoose.model('Orders' , OrdersSchema)