import express from "express";
import { getAllPlayers, getPlayerById, getTopPlayer, searchPlayers } from "../controllers/playersController.js";

const router = express.Router();

// Route GET /api/players
router.get("/players", getAllPlayers);

// Route GET /api/players/top
router.get("/players/top", getTopPlayer);

// Route GET /api/players/search
router.get("/players/search", searchPlayers);

// Route GET /api/players/:id
router.get("/players/:id", getPlayerById);

export default router;
