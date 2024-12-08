import * as quizTakenDao from "./dao.js";

export default function QuizTakenRoutes(app) {
  app.get(
    "/api/users/:userId/quizzes/:quizId/quizAttempts",
    async (req, res) => {
      const { userId, quizId } = req.params;
      const attempts = await quizTakenDao.findAttemptsByUserAndQuiz(
        userId,
        quizId
      );
      res.json(attempts);
    }
  );

  app.post("/api/quizAttempts", async (req, res) => {
    const attempt = req.body;
    const newAttempt = await quizTakenDao.createAttempt(attempt);
    res.json(newAttempt);
  });
}
