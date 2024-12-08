import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: false },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["Immidietely", "No", "After Due Date"],
      default: "Immidietely",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableFrom: { type: Date },
    availableUntil: { type: Date },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" }],
    isPublished: { type: Boolean, default: false },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true,
    },
  },
  { collection: "quizzes" }
);

schema.pre("save", async function (next) {
  if (!this.questions || this.questions.length === 0) {
    this.points = 0;
    return next();
  }

  const QuestionModel = mongoose.model("QuestionModel");

  const questions = await QuestionModel.find({ _id: { $in: this.questions } });

  this.points = questions.reduce((sum, question) => sum + question.points, 0);

  next();
});

export default schema;
