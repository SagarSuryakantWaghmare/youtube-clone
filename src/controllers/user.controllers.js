import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //     success: true,
  //     message: 'Register User'
  // });
  // Steps to register a user in the database
  // 1.get user details from frontend
  // Validation-not empty
  //Check if user already exists:username and email also
  //Check for images, check for avatar
  //upload them to cloudinary,avatar
  //Encrypt password
  //create user object -create entry in db
  //Check for user creation
  //Return res

  const { fulllName, email, password, username } = req.body;
  console.log("Email", email);
  console.log("Password", password);

  //   if(fulllName===""){
  //     throw new ApiError(400,"Fullname cannot be empty")
  //   }

  if (
    [fulllName, email, username, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }

  const existedUser = username.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Working on the image
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "AVatar file is required");
  }
const user= await User.create({
    fullName,
    avatar: avatar.url,
    // if the image is there then it will be ok otherwise it will be empty
    coverImage: coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()

  })
 const createdUSer=await User.findById(user._id).select(
  "-password -refreshToken"
 )
 if(!createdUSer){
  throw new ApiError(500,"Something went wrong while registering the user")
 }
 return res.status(201).json(
  new ApiResponse(201,"User registered successfully",createdUSer)
  

 )
});
export { registerUser };
