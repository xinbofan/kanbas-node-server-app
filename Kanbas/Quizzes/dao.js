import model from "./model.js";

export async function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}
export function updateModule(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}
