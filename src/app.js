import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());




app.route("/").get((req, res) => {
  res.send("welcome to courseX | by anshumancdx");
});

import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import courseRoutes from "./routes/course.routes.js";
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/course", courseRoutes);

export default app;