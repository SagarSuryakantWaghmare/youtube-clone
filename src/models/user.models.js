import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trime: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timeseries: true,
  }
);
// Generating the token
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});


// Comparing the password
userSchema.methods.isPassowrdCorrect=async function (password) {
  return await  bcrypt.compare(password,this.password)
}

userSchema.methods.generatedAccessToken=function(){
 return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullName:this.fullName
    },
    
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generatedRefreshoken=function(){
  return jwt.sign(
     {
       _id:this._id,
     },
     
     process.env.REFRESH_TOKEN_SECRET,
     {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
   )
 }
userSchema.methods.generatedRefreshToken=function(){}
export const User = mongoose.model("User", userSchema);
