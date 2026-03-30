const User = require("../models/User");

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findOne({ clerkId: req.auth.userId }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User record not found. Sync the user first.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.currentUser = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = requireAdmin;
