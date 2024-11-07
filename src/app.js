import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());




app.route("/").get((req, res) => {
  res.send("welcome to courseX | by anshumancdx");
});

import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);

export default app;