import { Router } from "express";
import { subjectRouter } from "./subject.roter";
import { timetableRouter } from "./timetable.router";
import { weekNumberRouter } from "./weekNumber.router";

export const router = Router();

router.use('/subject', subjectRouter);
router.use('/timetable', timetableRouter);
router.use('/week-number', weekNumberRouter);
