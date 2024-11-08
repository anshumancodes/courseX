import { Router } from "express";
import {verifyUserAuth} from "../middlewares/auth.middleware.js";
import { BuyCourse, fetchCourses } from "../controllers/Course.controller.js";


const router = Router();

router.route("/get-courses").post(verifyUserAuth,fetchCourses);
router.route("/buy-course").post(verifyUserAuth,BuyCourse);

export default router;