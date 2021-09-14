import { TeacherController } from "../db/controllers/teacher.controller";
import { Router } from "express";

const teacherController = new TeacherController();
const teacherRouter = Router();

teacherRouter.get('/all', teacherController.getAllTeachers);
teacherRouter.get('/:id', teacherController.getTeacherById);

export { teacherRouter };