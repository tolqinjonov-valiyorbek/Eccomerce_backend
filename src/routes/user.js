const express = require("express");
const {
  createUser,
  loginUser,
  views,
  view,
  deleted,
  update,
  blockUser,
  unblockUser,
  handleRefreshToken,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../Controller/userController.js");
const { authMiddleware } = require("../Middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.delete("/:id", deleted);
router.put("/edit-user/:id", update);
router.put("/password", authMiddleware, updatePassword);
router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id", unblockUser);
router.post("/reset-password", authMiddleware, forgotPassword);
router.put("/reset-password/:id", resetPassword);
router.get("/all-users", views);
router.get("/:id", view);

module.exports = router;

