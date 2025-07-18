import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";
import { Users } from "../mongoose/schema/Users.mjs";

const AuthRouter =Router() ;

AuthRouter.post( "/api/authendicate/login" , 
    async(req , res ) => {
        const {user_email , user_password } = req.body ;
        if( !user_email)
        {
            return res.status(401).send({
                error : "user email required"
            })
        }
        try{
            const user = await Users.findOne({ user_email : user_email }) 
            if( !user)
            {
                return res.status(401).send({
                    error : "user email is not found , please register"
                })
            }
            if( user_password != user.user_password )
            {
                return res.status(401).send({
                    error : "incorrect password , Please try again"
                })
            }
            const user_name = user.user_name ;
            const token = genToken({
                isAnonymous : false ,
                user_id: user._id ,
                user_name : user.user_name
            }) ;

            res.cookie("authorization" , token , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })

            res.status(200).send({
                user_name : user_name
            })
        }
        catch(error){
            res.status(501).send({
                error : error
            })
        }
    }
)

AuthRouter.post("/api/authendicate/register" ,
    async(req , res ) => {
        const user_data = req.body ;
        
        const final_data = {
            ...user_data ,
            isAdmin : false 
        }
        try{
            const user = new Users(final_data);
            const response = await user.save() ;
            if(!response)
            {
                return res.status(401).send({
                    error : "error in creating users" 
                })
            }
            const token = genToken({
                isAnonymous : false ,
                user_id: response._id 
            }) ;

            res.cookie("authorization" , token , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })

            res.status(200).send({
                user_name : response.user_name
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(401).send({
                error : error 
            })
        }
        
    }
)

AuthRouter.post("/api/authendicate/update_authendication" , 
    async(req , res ) => {

    }
)

AuthRouter.delete("/api/authendicate/delete_user" ,
    async(req , res ) => {

    }
)

export default AuthRouter;