import express from "express";
import {
  authMiddleware,
  loginController,
  logoutController,
  registerController,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  console.log(user);
  res
    .status(200)
    .json({ success: true, message: "Người dùng đã xác thực.", user });
});

export default router;
