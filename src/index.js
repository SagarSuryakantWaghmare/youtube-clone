// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})







/*
import express from "express";
const app = express();
// Simply making and function and calling it
// async function connectDb(){}

// connectDb()

// Making a function and calling it with async await

// ;-cleaning purpose
;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on the port ${process.env.PORT}`)
    });
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
})();

*/
