import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";

const AuthRouter =Router() ;

AuthRouter.post( "/api/authendicate/login" , 
    async(req , res ) => {
        console.log("loggin authendication ")
        const { email , password } = req.body
        // check in the db
        const tokenData = {
            email : email
        }
        const token = genToken(tokenData) ;
        res.cookie("authorization" , token , {
            httpOnly : true ,
            secure :  true  ,
            sameSite : "None"
        })
        res.status(200).send({
            status : "successfully logged in"
        })
    }
)

AuthRouter.post("/api/authendicate/register" ,
    verifyToken , 
    async(req , res ) => {
        const data = req.email ;
        console.log(req.email ) ;
        res.status(200).send({
            data : data 
        })
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