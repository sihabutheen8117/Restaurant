import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express();

mongoose.connect("mongodb://localhost/alkhalid_server")
    .then( ()=> console.log("Connected to Database"))
    .catch( (err) => console.log(err))

const PORT = process.env.PORT ;

app.listen( PORT , () => {
    console.log(`Server running on PORT - ${PORT}`)
})