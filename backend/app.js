import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import playerRoutes from "./routes/playersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", playerRoutes);
app.get("/", (req, res) => {
	res.send("Wonderkids API is up and running ⚽🚀");
});

export default app;
