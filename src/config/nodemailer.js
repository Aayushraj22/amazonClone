import { createTransport } from "nodemailer";

// Create transporter ONCE
const transporter = createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_PASS,
  },
  // Performance optimizations
  pool: true,
  maxConnections: 5,
  maxMessages: 100,

  // Connection timeout
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,

//   // 🔥 ADD THESE DEBUG LINES:
//     logger: true,        // Log all SMTP commands
//     debug: true          // Show raw SMTP conversation
});

// Verify connection ONCE on startup (Promise-based)
const verifyTransporterConnection = () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ SMTP connection failed:", error);
        reject(error);
      } else {
        console.log("✅ SMTP server ready");
        resolve(success);
      }
    });
  });
};

// Send email function with proper error handling
const sendEmail = async ({ to, subject, text = "", html = "" }) => {
  const mailOptions = {
    from: `"No Reply" <${process.env.SMTP_USER_EMAIL}>`, // Clean sender format
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    text,
    html,
  };
  

  console.log("options : ", mailOptions);
  console.log("🔍 SMTP DEBUG:");
  console.log("User:", process.env.SMTP_USER_EMAIL);
  console.log("Pass length:", process.env.SMTP_PASS?.length);
  console.log("Pass starts with:", process.env.SMTP_PASS);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};


// Export functions, not transporter directly
export { transporter, sendEmail, verifyTransporterConnection };
