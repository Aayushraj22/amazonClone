import connectDB from "./mongoDB.js";
import app from "./server.js";
import dotenv from "dotenv";
import { verifyTransporterConnection } from "./src/config/nodemailer.js";
dotenv.config(); // Load .env before any other imports

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await verifyTransporterConnection();
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1); // Exit with failure code
  }
};

startServer();
