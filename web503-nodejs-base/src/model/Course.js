import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: String,
    views: Number,
    thumbnail: String,
    note: String,
    category: String,
  },
  {
    timestamps: true,
  }
);
const Course = new mongoose.model("Course", courseSchema);

export default Course;
