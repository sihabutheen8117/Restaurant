import mongoose from 'mongoose'

const OrdersSchema = mongoose.Schema({
    order_id : {
        type : mongoose.Schema.Types.String ,
        required : true 
    },
    order_date : {
        type : mongoose.Schema.Types.Date,
        required : true 
    },
    ordered_foods : [
        {
            type : mongoose.Schema.Types.String,
            required : true
        }
    ],
    user_id : 
    {
        type : mongoose.Schema.Types.String,
        required : true
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
        type : mongoose.Schema.Types.String ,
        required : true
    },
    order_status : {
        type : mongoose.Schema.Types.String ,
        required : true
    }
})

export const Orders = mongoose.model('Orders' , OrdersSchema)