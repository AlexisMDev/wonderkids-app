import express from "express";
import cors from "cors";
import playerRoutes from "./routes/players.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", playerRoutes);
app.get("/", (req, res) => {
  res.send("Wonderkids API is up and running ⚽🚀");
});

export default app;
