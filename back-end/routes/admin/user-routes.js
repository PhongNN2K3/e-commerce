import express from "express";
import {
  getAllUsers,
  updateUserRole,
} from "../../controllers/admin/user-controller.js";

const router = express.Router();

// Fetch all users
router.get("/get", getAllUsers);

// Update user role
router.put("/update-role", updateUserRole);

export default router;
