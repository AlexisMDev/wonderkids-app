import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", verifyToken, (req, res) => {
	res.json({ message: "Voici ton profil", userId: req.user.userId });
});
export default router;
