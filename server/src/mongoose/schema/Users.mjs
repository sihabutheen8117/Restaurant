import mongoose from 'mongoose'
import { Foods } from './Foods.mjs'

const UsersSchema = mongoose.Schema({
    isAdmin : {
        type : mongoose.Schema.Types.Boolean ,
        required : true  
    },
    user_name : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    user_email : {
        type : mongoose.Schema.Types.String ,
        required : true ,
        unique : true 
    },
    user_password : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    order_id : [
        {
            type : mongoose.Schema.Types.ObjectId
        }
    ]
    },
    { timestamps: true } 
)


export const Users = mongoose.model('Users' , UsersSchema)