import { HomeworkController } from "../db/controllers/homework.controller";
import { Router } from "express";

const homeworkController = new HomeworkController();
const homeworkRouter = Router();

homeworkRouter.get('/week/:page', homeworkController.getHomeworksForWeek);

export { homeworkRouter };