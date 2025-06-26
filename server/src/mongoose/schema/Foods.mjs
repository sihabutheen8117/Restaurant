import mongoose from 'mongoose' ;

const ReviewSchema = mongoose.Schema({

    reviewer_id : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    reviewer_name : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    review_date : {
        type : mongoose.Schema.Types.Date,
        required : true 
    },
    review_ratings : {
        type : mongoose.Schema.Types.Number,
        required : true 
    },
    review_details : {
        type : mongoose.Schema.Types.String ,
        required : true 
    }

})

const OrderSchema = mongoose.Schema({
    order_id : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    order_date : {
        type : mongoose.Schema.Types.Date,
        required : true 
    }
})

const FoodSchema = mongoose.Schema({
    food_id : {
        type : mongoose.Schema.Types.String, 
        required : true 
    },
    food_name : {
        type : mongoose.Schema.Types.String ,
        required : true 
    },
    describtion : {
        type : mongoose.Schema.Types.String
    },
    price : {
        type : mongoose.Schema.Types.Number,
        required : true 
    },
    offer_price : {
        type : mongoose.Schema.Types.String
    },
    offer_validity : {
        type : mongoose.Schema.Types.Date
    },
    ingredients : [
        {
            type : mongoose.Schema.Types.String
        }
    ],
    reviews : [ReviewSchema],
    ratings : [
        {
            rater_id : {
                type : mongoose.Schema.Types.String,
                required : true
            },
            stars : {
                type : mongoose.Schema.Types.Number
            }
        }
    ],
    rating_stars : {
        type : mongoose.Schema.Types.Number
    },
    category : [
        {
            type : mongoose.Schema.Types.String
        }
    ],
    orders : [OrderSchema]
})

export const Foods = mongoose.model('Foods' , FoodSchema)