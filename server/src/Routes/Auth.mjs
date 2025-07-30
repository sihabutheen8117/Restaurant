import { Router } from "express";
import { verifyToken , genToken } from "../middlewares/authmiddleware.mjs";
import { Users } from "../mongoose/schema/Users.mjs";
import { errorHandler } from "../middlewares/authErrorHandler.mjs";
import { OAuth2Client } from 'google-auth-library'

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
                    message : "Email not found ! "
                })
            }
            if( user_password != user.user_password )
            {
                return res.status(401).send({
                    message : "incorrect password !"
                })
            }
            const user_name = user.user_name ;

            if( user.isAdmin == true )
            {
                const token = genToken({
                    isAnonymous : false ,
                    user_id: user._id ,
                    user_name : user.user_name ,
                    isAdmin : true 
                }) ;
    
                res.cookie("authorization" , token , {
                    httpOnly : true ,
                    secure :  true  ,
                    sameSite : "None"
                })

                return res.status(200).send({
                    user_name : user_name ,
                    user_role : "admin"
                })
            }

            const token = genToken({
                isAnonymous : false ,
                user_id: user._id ,
                user_name : user.user_name ,
                isAdmin : false 
            }) ;

            res.cookie("authorization" , token , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })

            console.log( "user_name to send , after logged in " , user_name )

            res.status(200).send({
                user_name : user_name ,
                user_role : "cust"
            })
        }
        catch(error){
            next(error)
        }
    }
)

AuthRouter.post("/api/authendicate/register" ,
    async(req , res , next) => {
        const user_data = req.body ;
        console.log(user_data)
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
                user_id: response._id ,
                user_name : response.user_name ,
                isAdmin : false 
            }) ;

            res.cookie("authorization" , token , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })

            res.status(200).send({
                user_name : response.user_name ,
                user_role : "cust"
            })
        }
        catch(error)
        {
            next(error)
        }
        
    }
)

AuthRouter.post('/api/google/oauth', async (req, res) => {

    res.header("Referrer-Policy","no-referrer-when-downgrade");

    const redirectURL = `${process.env.SERVER_API}/oauth`;
  
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
        redirectURL
      );
  
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid ',
        prompt: 'consent'
      });
  
      res.json({url:authorizeUrl})
  
  });

  const getUserData = async (access_token) => {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data ;
  }
  
  AuthRouter.get('/oauth', async (req, res) => {
  
      const code = req.query.code;
      try {
          const redirectURL = `${process.env.SERVER_API}/oauth`;

          const oAuth2Client = new OAuth2Client(
              process.env.CLIENT_ID,
              process.env.CLIENT_SECRET,
              redirectURL
            );

          const r =  await oAuth2Client.getToken(code);
          await oAuth2Client.setCredentials(r.tokens);
          const user_data = await getUserData(oAuth2Client.credentials.access_token);
          if(user_data.email_verified)
          {
            let find_user = await Users.findOne({ user_email : user_data.email});

            if(!find_user)
            {
                const new_user = new Users({
                    isAdmin : false ,
                    user_name : user_data.name ,
                    user_email : user_data.email ,
                    user_password : user_data.sub
                })

                find_user = await new_user.save() ;
            }
            const token = genToken({
                isAnonymous : false ,
                user_id: find_user._id ,
                user_name : user_data.name  ,
                isAdmin : false 
            }) ;
            res.cookie("authorization" , token , {
                httpOnly : true ,
                secure :  true  ,
                sameSite : "None"
            })
            return res.redirect(303, `${process.env.CORS_ORIGIN}/user/client?user_name=${user_data.name}`);
          }
          return res.redirect(303 , `${process.env.CORS_ORIGIN}/`)
        } catch (err) {
          console.log('Error logging in with OAuth2 user', err);
          return res.redirect(303 , `${process.env.CORS_ORIGIN}/`)
      }
  });


AuthRouter.use(errorHandler)


export default AuthRouter;