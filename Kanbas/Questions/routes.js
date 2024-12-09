import * as questionsDao from "./dao.js";

export default function QuestionRoutes(app) {
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await questionsDao.updateQuestion(
      questionId,
      questionUpdates
    );
    res.send(status);
  });

  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionsDao.deleteQuestion(questionId);
    res.send(status);
  });

  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionsDao.findQuestionById(questionId);
    res.send(status);
  });
}
