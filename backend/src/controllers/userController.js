const User = require("../models/User");

const syncUser = async (req, res, next) => {
  try {
    const authClerkId = req.auth.userId;
    const { clerkId, email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (clerkId && clerkId !== authClerkId) {
      return res.status(403).json({
        success: false,
        message: "clerkId does not match authenticated user",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        clerkId: authClerkId,
      },
      {
        clerkId: authClerkId,
        email,
        name: name || undefined,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A user with this clerkId already exists",
      });
    }

    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const user = await User.findOne({
      clerkId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Sync the user first.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  syncUser,
  getCurrentUser,
};
