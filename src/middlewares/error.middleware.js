import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  /**
   * 1️⃣ Zod validation errors
   */
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.issues.map((issue) => ({
      field: issue.path.length ? issue.path.join(".") : "root",
      message: issue.message,
    }));
  } else if (err instanceof ApiError) {
    /**
     * 2️⃣ Custom ApiError (business errors)
     */
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.code === 11000) {
    /**
     * 3️⃣ MongoDB duplicate key error
     */
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  } else {
    /**
     * 4️⃣ Fallback (unknown errors)
     */
    console.error("Unhandled Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
