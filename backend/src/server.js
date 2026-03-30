require("./config/env");

const app = require("./app");
const { connectDB, disconnectDB } = require("./config/db");
const { port, nodeEnv } = require("./config/env");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Backend server running on port ${port} in ${nodeEnv} mode`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  try {
    console.log(`${signal} received. Closing MongoDB connection...`);
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();
