import mongoose from "mongoose";
import Course from "../models/Course.model.js";
import ApiResponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";
import { User } from "lucide-react";


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
const fetchCourses = async (req,res)=>{
    const {user}=req.user;
    const userCourses=await User.findOne({_id:user.id}).select("courses");
    if(!userCourses){
        return res.status(400).json(new ApiError(400,"No courses found"));
    }

    const courses=await Course.find({_id:{$in:userCourses.courses}});
    if(!courses){
        return res.status(400).json(new ApiError(400,"Invalid courses"));
    }
    return res.status(200).json(new ApiResponse(200,"Courses fetched successfully",courses));

}
const BuyCourse=async (req,res)=>{
    const {courseId}=req.params;
    const {user}=req.user;
    const course=await Course.findOne({courseId});
    if(!course){
        return res.status(400).json(new ApiError(400,"Course not found"));
    }
   const UserBoughtCourse=await User.findOneAndUpdate({_id:user.id},{$push:{courses:course.courseId}});
   if(!UserBoughtCourse){
       return res.status(400).json(new ApiError(400,"Something went wrong while buying the course"));
   }
   return res.status(200).json(new ApiResponse(200,"Course bought successfully",UserBoughtCourse));
}

export {CreateCourse,DeleteCourse,fetchCourses,BuyCourse};