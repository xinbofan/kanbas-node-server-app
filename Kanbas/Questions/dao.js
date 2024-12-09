import model from "./model.js";

export async function createQuestion(question) {
  delete question._id;
  return model.create(question);
}

export async function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}

export async function updateQuestion(questionId, questionUpdates) {
  const updatedQuestion = await model.findByIdAndUpdate(
    questionId,
    questionUpdates,
    { new: true }
  );

  if (updatedQuestion && updatedQuestion.quiz) {
    const QuizModel = mongoose.model("QuizModel");
    const quiz = await QuizModel.findById(updatedQuestion.quiz);
    if (quiz) {
      await quiz.save(); // Update the total points for quiz
    }
  }

  return updatedQuestion;
}

export async function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

export async function findQuestionById(questionId) {
  return model.findById(questionId).populate("quiz");
}
