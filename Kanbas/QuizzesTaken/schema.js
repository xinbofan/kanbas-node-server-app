import mongoose from "mongoose";
const quizzesTakenSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    grade: Number,
    quizTakeDate: Date,
    status: {
      type: String,
      enum: ["NOTTAKE", "TAKEN"],
      default: "NOTTAKE",
    },
  },
  { collection: "quizzesTaken" }
);
export default quizzesTakenSchema;
