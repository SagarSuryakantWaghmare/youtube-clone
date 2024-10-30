import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  // Destructure request body
  const { fullName, email, password, username } = req.body;
  console.log("Email", email);
  console.log("Password", password);

  // Check if any fields are empty
  if ([fullName, email, username, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are mandatory");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Check for files
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  console.log("Files received:", req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Uploading images to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  // Encrypt the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = new User({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // Default to empty string if no cover image
    email,
    password: hashedPassword,
    username: username.toLowerCase(),
  });

  try {
    await user.save(); // Save user and handle potential errors
  } catch (error) {
    throw new ApiError(500, "Something went wrong while registering the user: " + error.message);
  }

  // Return response
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export { registerUser };
