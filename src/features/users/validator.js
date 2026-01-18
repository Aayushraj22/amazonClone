import { z } from "zod";
import { emailRegex, usernameRegex, passwordRegex } from "../../utils/regex.js";
import { USER_ROLES } from "../../utils/index.js";

const registerWithPasswordValidatorSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Invalid email format"),

  username: z
    .string()
    .trim()
    .regex(
      usernameRegex,
      "Username must be 3–20 chars, lowercase letters, numbers, dots or underscores"
    ),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number and special character"
    ),

  role: z.enum(USER_ROLES, {
    errorMap: () => ({
      message: `Role must be one of: ${USER_ROLES.join(", ")}`,
    }),
  }),
});

const loginWithPasswordValidatorSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Invalid email format"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

const verifyEmailOTPValidatorSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Invalid email format"), 
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const verifyEmail = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Invalid email format"),
});

export { registerWithPasswordValidatorSchema, loginWithPasswordValidatorSchema, verifyEmailOTPValidatorSchema, verifyEmail };
