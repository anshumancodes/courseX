import Admin from "../models/Admin.model.js";
import ApiResponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {tokenegenerator} from "./User.controller.js";

//  admin login, admin signup, create a course, delete a course, add course content.

const AdminSignup = async (req, res) => {
    const {username,password,email} = req.body;
    if (!username || !password || !email) {
        return res
            .status(400)
            .json(new ApiError(400, "Please provide all the fields"));
    }
    const existingAdmin = await Admin.findOne({ email});
    if (existingAdmin) {
        return res.status(400).json(new ApiError(400, "Admin already exists"));
    }
    try{
        const admin =await Admin.create({
            username,
            password,
            email,
            acessKey:Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)
        });

        if(admin){
            return res.status(200).json(new ApiResponse(200, "Admin created successfully", admin.select("-password -acessKey")));
        }
    }catch(error){
        return res.status(500).json(new ApiError(500, "Admin creation failed"));
    }

}

const AdminLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json(new ApiError(400, "Please provide all the fields"));
    }
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json(new ApiError(400, "Admin not found"));
        }
        if (admin.password !== password) {
            return res.status(400).json(new ApiError(400, "Invalid password"));
        }

        const payload={
            username:admin.username,
            acessKey:admin.acessKey
        }
        const token = tokenegenerator({payload});
        res.setcookie("courseX_admin_token",token,{httpOnly:true,secure:true});
        return res.status(200).json(new ApiResponse(200, "Admin Login successful", admin.select("-password -acessKey")));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Admin Login failed"));
        
    }
}


export { AdminLogin,AdminSignup };