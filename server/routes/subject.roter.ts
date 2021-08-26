import { SubjectController } from "../db/controllers/subject.controller";
import { Router } from "express";

const subjectController = new SubjectController();
const subjectRouter = Router();

subjectRouter.get('/all', subjectController.getAllSubjects);
subjectRouter.get('/:id', subjectController.getSubjectById)

export { subjectRouter };