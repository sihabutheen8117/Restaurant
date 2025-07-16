import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";
import { Users } from "../mongoose/schema/Users.mjs";

const UserRouter =Router() ;


UserRouter.post( "/api/set_user_name_for_anonymous" , 
    async(req , res ) => {
        const {user_name} = req.body ;
        if( ! user_name )
        {
            res.status(401).send({
                error : "user_name required"
            })
        }
        try{
          
        }
        catch(error){
            res.status(501).send({
                error : error
            })
        }
    }
)


export default UserRouter;