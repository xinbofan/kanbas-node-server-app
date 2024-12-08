import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    text: String,
    questionType: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
      default: "Multiple Choice",
    },
    points: { type: Number, default: 1 },
    options: [
      {
        text: String,
        isCorrect: { type: Boolean, default: false },
      },
    ], // Multiple Choice
    correctAnswer: String, // True/False & Fill in the Blank
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizModel",
      required: true,
    },
  },
  { collection: "questions" }
);

export default schema;
