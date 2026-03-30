const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = ClerkExpressRequireAuth();

const requireAuth = (req, res, next) => {
  clerkAuth(req, res, (error) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    return next();
  });
};
module.exports = {
  requireAuth,
};
