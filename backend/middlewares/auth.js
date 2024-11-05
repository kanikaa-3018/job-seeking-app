import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Retrieve token from cookies
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by decoded token's id
    req.user = await User.findById(decoded.id);

    // If user is not found, throw an error
    if (!req.user) {
      return next(new ErrorHandler("User no longer exists", 404));
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Handle invalid or expired token
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
