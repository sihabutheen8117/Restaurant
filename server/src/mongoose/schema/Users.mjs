import mongoose from 'mongoose'

const UsersSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    user_name : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    user_email : {
        type : mongoose.Schema.Types.String ,
        required : true
    },
    user_password : {
        type : mongoose.Schema.Types.String,
        required : true 
    },
    order_ids : [
        {
            type : mongoose.Schema.Types.String
        }
    ]
})

export const Users = mongoose.model('Users' , UsersSchema)