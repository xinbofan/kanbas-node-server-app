import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("Received update request for assignment:", assignmentId);
    console.log("Received body:", req.body);
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    if (status.matchedCount === 0) {
      console.log("metched 0");
    }
    res.send(status);
  });
}
