import model from "./model.js";

export async function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export async function findQuizById(quizId) {
  return model.findById(quizId).populate("questions");
}
export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}
