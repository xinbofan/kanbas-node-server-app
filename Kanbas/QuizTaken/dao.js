import model from "./model.js";

export async function findAttemptsByUserAndQuiz(userId, quizId) {
  return model
    .find({ user: userId, quiz: quizId })
    .populate("quiz")
    .populate("answers.question");
}

export async function createQuizAttempt(quizAttempt) {
  return model.create(quizAttempt);
}
