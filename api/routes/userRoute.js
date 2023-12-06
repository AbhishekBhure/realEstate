import express from "express";
import { getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/update/:id", verifyToken, updateUser);

export default router;
