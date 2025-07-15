import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.authorization;
    console.log(req.cookies);
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user_data = decodedToken;
      next(); 
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
  };

  export const verifyTokenHelper = (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user_data = decodedToken;
      console.log("from verify token")
      console.log("user_data")
      return user_data 
    } catch (err) {
      console.log(err)
    }
  };


export const genToken = ( tokenData ) => {
    const token = jwt.sign(tokenData , process.env.ACCESS_TOKEN_SECRET  ,
        {
            expiresIn : process.env.TOKEN_EXPIRES
        }
    );
    return token ;
}

export const genAnonymousToken = ( tokenData ) => {
    const token = jwt.sign(tokenData , process.env.ACCESS_TOKEN_SECRET  ,
        {
            expiresIn : "1d"
        }
    );
    return token ;
}