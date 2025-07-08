import jwt from 'jsonwebtoken'

export const verifyToken = (req , res , next ) => {
    const token = req.cookies.Authorization ;
    console.log(req.cookies) 
    if(!token)
    {
        return res.status(401).json({
            error : "access denied"
        })
    }

    try {
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, 
            async(err , decodedToken)=>{
                if (err) return res.status(403).send({ message: "Invalid Token" });
                try{
                    //checking in the database
                    req.email = decode.email
                    next();
                }
                catch(err){
                    next(err);
                }
            }
        )
       
        next()
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export const genToken = ( tokenData ) => {
    const token = jwt.sign(tokenData , process.env.ACCESS_TOKEN_SECRET  ,
        {
            expiresIn : process.env.TOKEN_EXPIRES
        }
    );
    return token ;
}