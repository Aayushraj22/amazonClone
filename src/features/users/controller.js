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

    // set the token into cookie
    const { token } = result;
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json(new ApiResponse(
      200,
      {
        token,
        email: result.user.personalInfo.email,
        username: result.user.personalInfo.username,
        role: result.user.auth.role,
      },
      "Login successful"
    ));
  } catch (error) {
    next(error);
  }
};

export const sendEmailOTP = async (req, res, next) => {
  const { email } = req.body;

  // return res.status(200).send("OTP sent successfully");

  try {
    const result = await authService.sendEmailOTP(email);
    res.status(200).json(
      new ApiResponse(200, null, 'OTP sent successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const verifyEmailOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const result = await authService.verifyEmailOTP(email, otp);

    // set the token into cookie
    const { token, user } = result;
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json(new ApiResponse(
        200,
        {
          token,
          email: user.personalInfo.email,
          username: user.personalInfo.username,
          role: user.auth.role,
        },
        "Email verified successfully"
      ));
  } catch (error) {
    next(error);
  }
};
