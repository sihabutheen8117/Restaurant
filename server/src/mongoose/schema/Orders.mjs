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
        type : mongoose.Schema.Types.Boolean 
    },
    order_status : {
        type : mongoose.Schema.Types.String ,
        required : true
    },
    user_name : {
        type : mongoose.Schema.Types.String
    }
    },
    { timestamps: true } 
)

export const Orders = mongoose.model('Orders' , OrdersSchema)