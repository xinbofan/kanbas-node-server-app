import model from "./model.js";

export async function createQuizAttempt(attempt) {
  return model.create(attempt);
}

export async function updateQuizAttempt(attempt) {
  return model.findByIdAndUpdate(attempt._id, attempt, { new: true }); // To get latest score
}

export async function findLastAttemptByUserAndQuiz(userId, quizId) {
  return model.findOne({ user: userId, quiz: quizId });
}

export async function getAttemptNumberByUserAndQuiz(userId, quizId) {
  const lastAttempt = await model
    .findOne({ user: userId, quiz: quizId })
    .select("attemptNumber");
  return lastAttempt ? lastAttempt.attemptNumber : 0;
}

export function calculateScore(questions, answers) {
  let score = 0;
  for (const question of questions) {
    const userAnswer = answers.find(
      (a) => a.question.toString() === question._id.toString()
    );
    if (!userAnswer) continue;

    if (question.questionType === "Multiple Choice") {
      const correctOption = question.options.find((o) => o.isCorrect);
      if (userAnswer.userAnswer === correctOption?.text) {
        score += question.points;
      }
    } else if (question.questionType === "Fill in the Blank") {
      if (
        userAnswer.userAnswer?.trim().toLowerCase() ===
        question.correctAnswer?.trim().toLowerCase()
      ) {
        score += question.points;
      }
    } else if (question.questionType === "True/False") {
      if (userAnswer.userAnswer === question.correctAnswer) {
        score += question.points;
      }
    }
  }
  return score;
}
