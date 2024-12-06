import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    questions: [
      {
        type: {
          type: String,
          enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
        },
        question: String,
        answers: String,
        correctAnswer: String,
        points: Number,
      },
    ],
    totalPoints: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableFrom: { type: Date },
    availableUntil: { type: Date },
  },
  { collection: "quizzes" }
);

export default schema;
