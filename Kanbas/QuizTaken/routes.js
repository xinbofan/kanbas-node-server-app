import * as quizTakenDao from "./dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import * as questionsDao from "../Questions/dao.js";

export default function QuizTakenRoutes(app) {
  app.post("/api/quizTaken/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const { userId, answers } = req.body;
    try {
      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      const score = quizTakenDao.calculateScore(questions, answers);

      // If taken before
      const existingAttempt = await quizTakenDao.findLastAttemptByUserAndQuiz(
        userId,
        quizId
      );

      if (existingAttempt) {
        // Update last attempt
        existingAttempt.answers = answers;
        existingAttempt.score = score;
        existingAttempt.attemptNumber += 1;
        existingAttempt.takenAt = new Date();
        const updatedAttempt = await quizTakenDao.updateQuizAttempt(
          existingAttempt
        );
        return res.json(updatedAttempt);
      } else {
        // First Attempt, create new attempt
        const newAttempt = await quizTakenDao.createQuizAttempt({
          user: userId,
          quiz: quizId,
          answers,
          score,
        });
        return res.json(newAttempt);
      }
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
      res.status(500).send({ message: "Failed to save quiz attempt" });
    }
  });

  app.get("/api/quizTaken/:userId/:quizId/lastAttempt", async (req, res) => {
    const { userId, quizId } = req.params;
    const attempt = await quizTakenDao.findLastAttempt(userId, quizId);
    if (!attempt) {
      return res.status(200).json(null); // return null for front end
    }
    res.json(attempt);
  });

  app.get("/api/quizTaken/:userId/:quizId/attempts", async (req, res) => {
    const { userId, quizId } = req.params;
    const attemptNumber = await quizTakenDao.getAttemptNumberByUserAndQuiz(
      userId,
      quizId
    );
    res.json({ attemptNumber });
  });
}
