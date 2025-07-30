import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

//for socket  io 
import http from 'http' 
import { Server } from 'socket.io';
//

import AuthRouter from './Routes/Auth.mjs';
import FoodModuleRouter from './Routes/FoodModule.mjs';
import UserRouter from './Routes/UserRoute.mjs';
import AnalyticsRouter from './Routes/Analytics.mjs';
import MainAnalytics from './Routes/MainAnalytics.mjs';
import SettingsRouter from './Routes/Settings.mjs';
import CloudUpload from './Routes/CloudUpload.mjs';

import { startOfferCleanupJob } from './jobs/updateExpiredOffers.mjs';

dotenv.config()

const app = express();


app.use(express.json( {
    limit : "15mb"
}));
app.use(express.urlencoded({ extended: true  , limit : "15mb"}));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_DB_CONNECT)
    .then( ()=> {
      console.log("Connected to Database")
      startOfferCleanupJob()
    })
    .catch( (err) => console.log(err))

const PORT = process.env.PORT ;

const corsOptions = {
    origin : process.env.CORS_ORIGIN , 
    methods : ['GET' , "POST" , 'PUT' , 'DELETE'], 
    credentials: true 
}
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server ,{
    cors: {
      origin: process.env.CORS_ORIGIN , 
      methods: ["GET", "POST"],
      credentials: true
    }
  });


const adminSockets = new Map();
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('admin-connect', (adminData) => {
    console.log('Admin connected:', adminData);
    adminSockets.set(socket.id, {
      ...adminData,
      socketId: socket.id
    });
    
    console.log("from server")
    console.log(adminSockets)
    // Send confirmation to admin
    socket.emit('admin-connected', {
      message: 'Admin connected successfully'
    });
  });

  // Handle user connection
  socket.on('user-connect', (userData) => {
    console.log('User connected:', userData);
    userSockets.set(socket.id, {
      ...userData,
      socketId: socket.id
    });
    
    socket.emit('user-connected', {
      message: 'User connected successfully',
      userId: userData.userId
    });
  });

  socket.on('new-order', (orderData) => {

    console.log('New order received:', orderData);
    
    // Add timestamp and socket info
    const orderWithMetadata = {
      ...orderData,
      timestamp: new Date(),
      socketId: socket.id,
      status: 'pending'
    };

    // Emit to all connected admins
    adminSockets.forEach((admin, socketId) => {
      io.to(socketId).emit('order-received', orderWithMetadata);
    });

   

  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (adminSockets.has(socket.id)) {
      adminSockets.delete(socket.id);
      console.log('Admin disconnected');
    }
    
    if (userSockets.has(socket.id)) {
      userSockets.delete(socket.id);
      console.log('User disconnected');
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.adminSockets = adminSockets;
  req.userSockets = userSockets ;
  next();
});

app.use(AuthRouter);
app.use(FoodModuleRouter);
app.use(UserRouter)
app.use(AnalyticsRouter)
app.use(MainAnalytics)
app.use(SettingsRouter)
app.use(CloudUpload)

app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  
  const processedOrder = {
    ...orderData,
    orderId: Date.now().toString(),
    timestamp: new Date(),
    status: 'pending'
  };
  

  adminSockets.forEach((admin, socketId) => {
    io.to(socketId).emit('order-received', processedOrder);
  });
  
  res.json({
    success: true,
    order: processedOrder,
    message: 'Order placed successfully'
  });
});

app.get('/api/count/status', (req, res) => {
  res.json({
    connectedAdmins: adminSockets.size,
    connectedUsers: userSockets.size
  });
});

server.listen( PORT , () => {
    console.log(`Server running on PORT - ${PORT}`)
})
