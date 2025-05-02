import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import { getPlayers, getPlayerById, getTopPlayer, searchPlayers } from "../controllers/playersController.js";

const router = express.Router();

// Route GET /api/players
router.get("/players", verifyToken, getPlayers);

// Route GET /api/players/top
router.get("/players/top", getTopPlayer);

// Route GET /api/players/search
router.get("/players/search", searchPlayers);

// Route GET /api/players/:id
router.get("/players/:id", getPlayerById);

export default router;
