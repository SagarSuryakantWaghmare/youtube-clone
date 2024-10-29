// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})


connectDB()




// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants";




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
