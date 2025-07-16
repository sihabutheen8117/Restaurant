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

dotenv.config()

const app = express();


app.use(express.json( {
    limit : "15mb"
}));
app.use(express.urlencoded({ extended: true  , limit : "15mb"}));
app.use(cookieParser())

//mongodb+srv://sihabutheen8117:<db_password>@cluster0.296mzuv.mongodb.net/
//mongodb://localhost/alkhalid_server

mongoose.connect("mongodb+srv://sihabutheen8117:xe4hR1zxe0hEN5I5@cluster0.296mzuv.mongodb.net/")
    .then( ()=> console.log("Connected to Database"))
    .catch( (err) => console.log(err))

const PORT = process.env.PORT ;

// front-ends : http://localhost:3000
// https://restaurant-a9nobx1bv-sihabutheens-projects.vercel.app
const corsOptions = {
    origin : "https://restaurant-a9nobx1bv-sihabutheens-projects.vercel.app" , 
    methods : ['GET' , "POST" , 'PUT' , 'DELETE'], 
    credentials: true 
}
app.use(cors(corsOptions));

//routers

//socket io
const server = http.createServer(app);
const io = new Server(server ,{
    cors: {
      origin: "https://restaurant-a9nobx1bv-sihabutheens-projects.vercel.app", // Your Next.js app URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  //socket io implementation

const adminSockets = new Map();
const userSockets = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle admin connection
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

  // Handle new order from client
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

    // Send confirmation back to the user
    // socket.emit('order-confirmed', {
    //   orderId: orderData.orderId,
    //   message: 'Order received successfully',
    //   status: 'confirmed'
    // });

  });

  // Handle order status updates from admin
//   socket.on('update-order-status', (statusData) => {
//     console.log('Order status update:', statusData);
    
//     // Find the user who placed the order and notify them
//     const targetSocket = statusData.userSocketId;
//     if (targetSocket) {
//       io.to(targetSocket).emit('order-status-updated', statusData);
//     }

//     // Notify all admins about the status change
//     adminSockets.forEach((admin, socketId) => {
//       if (socketId !== socket.id) { // Don't send back to the admin who updated
//         io.to(socketId).emit('order-status-changed', statusData);
//       }
//     });
//   });

//   // Handle admin response to order
//   socket.on('admin-order-response', (responseData) => {
//     console.log('Admin response:', responseData);
    
//     if (responseData.userSocketId) {
//       io.to(responseData.userSocketId).emit('admin-response', responseData);
//     }
//   });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove from admin sockets if exists
    if (adminSockets.has(socket.id)) {
      adminSockets.delete(socket.id);
      console.log('Admin disconnected');
    }
    
    // Remove from user sockets if exists
    if (userSockets.has(socket.id)) {
      userSockets.delete(socket.id);
      console.log('User disconnected');
    }
  });
});

// // REST API Routes
// app.get('/api/orders', (req, res) => {
//   // Mock orders data - replace with your database query
//   const orders = [
//     {
//       orderId: '1',
//       userId: 'user123',
//       items: [
//         { name: 'Pizza', quantity: 2, price: 25.99 },
//         { name: 'Burger', quantity: 1, price: 12.99 }
//       ],
//       total: 64.97,
//       status: 'pending',
//       timestamp: new Date()
//     }
//   ];
//   res.json(orders);
// });

app.use((req, res, next) => {
  req.io = io;
  req.adminSockets = adminSockets;
  req.userSockets = userSockets ;
  next();
});

app.use(AuthRouter);
app.use(FoodModuleRouter);




app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  
  // Process the order (save to database, etc.)
  const processedOrder = {
    ...orderData,
    orderId: Date.now().toString(),
    timestamp: new Date(),
    status: 'pending'
  };
  
  // Emit to all connected admins via Socket.IO
  adminSockets.forEach((admin, socketId) => {
    io.to(socketId).emit('order-received', processedOrder);
  });
  
  res.json({
    success: true,
    order: processedOrder,
    message: 'Order placed successfully'
  });
});

// Get connected admins count
app.get('/api/count/status', (req, res) => {
  res.json({
    connectedAdmins: adminSockets.size,
    connectedUsers: userSockets.size
  });
});



server.listen( PORT , () => {
    console.log(`Server running on PORT - ${PORT}`)
})

// app.listen( PORT , () => {
//     console.log(`Server running on PORT - ${PORT}`)
// })