import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timeseries: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
