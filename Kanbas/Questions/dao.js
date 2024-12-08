import model from "./model.js";

export async function createQuestion(question) {
  delete question._id;
  return model.create(question);
}

export async function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}

export async function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, questionUpdates);
}

export async function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

export async function findQuestionById(questionId) {
  return model.findById(questionId).populate("quiz");
}
