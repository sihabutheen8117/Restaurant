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

mongoose.connect("mongodb://localhost/alkhalid_server")
    .then( ()=> console.log("Connected to Database"))
    .catch( (err) => console.log(err))

const PORT = process.env.PORT ;


const corsOptions = {
    origin : "http://localhost:3000" , 
    methods : ['GET' , "POST" , 'PUT' , 'DELETE'], 
    credentials: true 
}
app.use(cors(corsOptions));

//routers
app.use(AuthRouter);
app.use(FoodModuleRouter);


//socket io
const server = http.createServer(app);
const io = new Server(server);

io.on("connection" , (socket) => {
    console.log("User connected socket io server ")

    //disconnecting
    socket.on( "disconnect" , () => {
        console.log("User disconnected socket io server")
    })
})

server.listen( PORT , () => {
    console.log(`Server running on PORT - ${PORT}`)
})

// app.listen( PORT , () => {
//     console.log(`Server running on PORT - ${PORT}`)
// })