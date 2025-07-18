export const errorHandler = (err, req, res, next) => {
    
    console.error(err);
  
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = "Please check all fields are filled 1"
    }
  
    // Mongoose cast error (e.g., invalid ObjectId)
    else if (err.name === 'CastError') {
      statusCode = 400;
      message = "Something went wrong !";
    }
  
    // Duplicate key error
    else if (err.code === 11000) {
      statusCode = 409;
      const fields = Object.keys(err.keyValue).join(', ');
      message = "Email already exists !"
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  