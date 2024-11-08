import mongoose from "mongoose";
import Course from "../models/Course.model.js";
import ApiResponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";


const CourseIdGenerator=(courseName)=>{

    const courseid=courseName+Math.random().toString(36).substring(2,15);
    return courseid;
}


const CreateCourse=async (req,res) => {
    const {name,price,courseName} = req.body;
    if(!name|| !price || !courseName){
        return res.status(400).json(new ApiError(400,"Please provide all the fields"));
    }
    const {admin} = req.admin;
    const course=await Course.create({
        name,
        price,
        courseId:CourseIdGenerator(courseName),
        owner:admin.id
    });
    
    if(!course){
        return res.status(500).json(new ApiError(500,"Course creation failed"));


    }
    return res.status(200).json(new ApiResponse(200,"course created successfully",course));
}

const DeleteCourse=async (req,res)=>{

    const {courseId,name} = req.body;
    if(!courseId||!name){
        return res.status(400).json(new ApiError(400,"Please provide both name and course id"));

    }
    const {admin} = req.admin;
    const course=await Course.findOneAndDelete({courseId,owner:admin.id});
    if(!course){
        return res.status(400).json(new ApiError(400,"Course not found"));
    }
    return res.status(200).json(new ApiResponse(200,"Course deleted successfully",course));
}


export {CreateCourse,DeleteCourse};