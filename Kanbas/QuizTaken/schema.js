import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionModel",
        },
        userAnswer: mongoose.Schema.Types.Mixed,
        isCorrect: { type: Boolean },
      },
    ],
    score: Number,
    attemptNumber: { type: Number, default: 1 },
    takenAt: { type: Date, default: Date.now },
  },
  { collection: "quizTaken" }
);

export default schema;
