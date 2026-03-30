const express = require("express");

const { syncUser, getCurrentUser } = require("../controllers/userController");

const router = express.Router();

router.post("/sync", syncUser);
router.get("/me", getCurrentUser);

module.exports = router;
