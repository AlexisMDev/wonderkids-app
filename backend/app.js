import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import playerRoutes from "./routes/playersRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // l'origine du frontend
    credentials: true, // autorise les cookies / headers d'auth
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wonderkids API is up and running ⚽🚀");
});
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api", playerRoutes);

export default app;
