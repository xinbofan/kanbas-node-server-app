import model from "./model.js";
export function takeUserInQuiz(user, quiz) {
  return model.create({ user, quiz });
}
