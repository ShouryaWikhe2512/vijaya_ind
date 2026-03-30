const mongoose = require("mongoose");
const { mongoUrl } = require("./env");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    error.message = `MongoDB connection failed: ${error.message}`;
    throw error;
  }

  isConnected = true;
  return mongoose.connection;
};

const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
};

module.exports = {
  connectDB,
  disconnectDB,
};
