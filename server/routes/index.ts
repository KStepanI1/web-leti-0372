import { Router } from "express";
import { subjectRouter } from "./subject.roter";
import { timetableRouter } from "./timetable.router";
import { weekNumberRouter } from "./weekNumber.router";
import { teacherRouter } from "./teacher.router";
import { homeworkRouter } from "./homework.router";

export const router = Router();

router.use('/subject', subjectRouter);
router.use('/timetable', timetableRouter);
router.use('/week-number', weekNumberRouter);
router.use('/teacher', teacherRouter);
router.use('/homework', homeworkRouter);
