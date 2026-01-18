import { sendEmail } from "../../config/nodemailer.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateRandomOTP } from "../../utils/index.js";
import User from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";
const SALT_ROUNDS = 10;

export const registerWithPassword = async ({
  email,
  username,
  password,
  role,
}) => {
  // Check if user already exists
  const existingUser = await User.findOne({
    "personalInfo.email": email.toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered.");
  }

  // Check if username already exists
  const existingUsername = await User.findOne({
    "personalInfo.username": username,
  });

  if (existingUsername) {
    throw new ApiError(409, "Username already taken");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create new user
  const newUser = new User({
    personalInfo: {
      email: email.toLowerCase(),
      username,
    },
    auth: {
      passwordHash: hashedPassword,
      isEmailVerified: true,
      role,
    },
    accountStatus: {
      isActive: true,
    },
  });

  await newUser.save();

  // Remove sensitive fields before returning
  return newUser;
};

export const loginWithPassword = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({
    "personalInfo.email": email.toLowerCase(),
  }).select("+auth.passwordHash");
  //   console.log("user : ", user);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check if account locked or inactive
  if (user.auth.accountLocked || !user.accountStatus.isActive) {
    throw new ApiError(403, "Account locked or inactive.");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.auth.passwordHash);

  if (!isMatch) {
    // Optional: increment failedLoginAttempts and lock account if threshold exceeded

    user.auth.failedLoginAttempts += 1;
    if (user.auth.failedLoginAttempts > 5) user.auth.accountLocked = true;
    await user.save();

    throw new ApiError(401, "Invalid email or password.");
  }

  // Reset failed login attempts after successful login
  user.auth.failedLoginAttempts = 0;
  user.auth.lastLogin = new Date();
  await user.save();

  // Issue JWT
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.personalInfo.email,
      role: user.auth.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user,
  };
};

// export const sendMobileOTP = async (mobileNumber) => {
//   // Implementation for sending OTP to mobile number
// };

// export const verifyMobileOTP = async (mobileNumber, otp) => {
//   // Implementation for verifying OTP for mobile number
// };

// In-memory OTP store (persists across requests within single process)
const otpStore = new Map(); // email -> {otpHash, expiresAt, attempts}

// Cleanup expired OTPs periodically
const clearExpiredOTPs = () => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email);
    }
  }
};

// Implementation for sending OTP to email
export const sendEmailOTP = async (email) => {
  // Check existing user
  const existingUser = await User.findOne({
    "personalInfo.email": email,
  }).lean();

  console.log("EEEEEEE : ", existingUser);

  const otp = generateRandomOTP();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  if (otpStore.has(email)) {
    otpStore.set(email, {
      otpHash,
      expiresAt,
      attempts: otpStore.get(email).attempts + 1,
    });
  } else {
    otpStore.set(email, { otpHash, expiresAt, attempts: 0 });
  }

  // Cleanup expired OTPS every 5 minutes
  clearExpiredOTPs();

  // Send email
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your OTP Code</h2>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: #007bff; font-size: 2.5em; margin: 0; letter-spacing: 5px;">
            ${otp}
          </h1>
        </div>
        <p style="color: #666;">This code expires in <strong>10 minutes</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore.</p>
      </div>
    `,
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  });

  return { success: true, message: "OTP sent" };
};

export const verifyEmailOTP = async (email, otp) => {
  const otpData = otpStore.get(email);

  if (!otpData || Date.now() > otpData.expiresAt) {
    throw new Error("OTP expired or not found");
  }

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  if (otpHash !== otpData.otpHash) {
    otpData.attempts += 1;
    otpStore.set(email, otpData);

    if (otpData.attempts >= 3) {
      otpStore.delete(email);
    }
    throw new Error("Invalid OTP");
  }

  // Mark user as verified
  const user = await User.findOneAndUpdate(
    { "personalInfo.email": email },
    { $set: { "auth.isEmailVerified": true } },
    { new: true }
  );

  // Cleanup
  otpStore.delete(email);
  return user;
};
