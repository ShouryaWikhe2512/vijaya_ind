const dotenv = require("dotenv");

dotenv.config();

const mongoUrl = process.env.MONGO_URL || process.env.MONGO_URI;
const requiredEnvVars = ["PORT"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

if (!mongoUrl) {
  throw new Error("Missing required environment variable: MONGO_URL");
}

module.exports = {
  mongoUrl,
  clerkSecretKey: process.env.CLERK_SECRET_KEY || "",
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
};
