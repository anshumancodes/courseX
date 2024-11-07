import { Router } from "express";
import { AdminLogin,AdminSignup } from "../controllers/Admin.controller.js";

const router = Router();

router.route("/login").post(AdminLogin);
router.route("/signup").post(AdminSignup);

export default router;