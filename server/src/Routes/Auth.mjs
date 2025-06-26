import { Router } from "express";

const AuthRouter =Router() ;

AuthRouter.post( "/api/autendicate/login" , 
    async(req , res ) => {
        console.log(req);
    }
)

AuthRouter.post("/api/authendicate/register" ,
    async(req , res ) => {

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