import * as authService from "./service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// Register user with email and password
export const registerWithPassword = async (req, res, next) => {
  try {
    const result = await authService.registerWithPassword(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, result, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// Login user with email and password
export const loginWithPassword = async (req, res, next) => {
  try {
    const result = await authService.loginWithPassword(req.body);

    res.status(200).json(new ApiResponse(200, result, "Login successful"));
  } catch (error) {
    next(error);
  }
};

export const sendEmailOTP = async (req, res, next) => {
  const { email } = req.body;
  console.log("req.body : ", req.body);

  // return res.status(200).send("OTP sent successfully");

  try {
    const result = await authService.sendEmailOTP(email);
    res.status(200).json(
      new ApiResponse(200, result, 'OTP sent successfully')
    );
  } catch (error) {
    console.log('error occurs here : ')
    next(error);
  }
};

export const verifyEmailOTP = async (req, res, next) => {
  try {
    const result = await authService.verifyEmailOTP(req.body);
    res
      .status(200)
      .json(new ApiResponse(200, result, "Email verified successfully"));
  } catch (error) {
    next(error);
  }
};
