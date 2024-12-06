import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    availableFrom: Date,
    availableUntil: Date,
    dueDate: Date,
    points: Number,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
  },
  { collection: "assignments" }
);
export default schema;
