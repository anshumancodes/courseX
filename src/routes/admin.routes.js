import { Router } from "express";
import { AdminLogin,AdminSignup } from "../controllers/Admin.controller.js";
import {verifyAdminAuth} from "../middlewares/auth.middleware.js";
import { CreateCourse,DeleteCourse } from "../controllers/Course.controller.js";

const router = Router();

router.route("/login").post(AdminLogin);
router.route("/signup").post(AdminSignup);
router.route("/admin/create-Course").post(verifyAdminAuth,CreateCourse);
router.route("/admin/delete-Course").post(verifyAdminAuth,DeleteCourse);


export default router;