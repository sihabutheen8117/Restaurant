import mongoose from "mongoose";

const AnonymousUserSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.String ,
        required : true ,
        unique : true 
    },
    order_id : [
        {
            type : mongoose.Schema.Types.ObjectId,
            unique : true 
        }
    ]
})

export const AnonymousUser = mongoose.model('AnonymousUser' , AnonymousUserSchema)