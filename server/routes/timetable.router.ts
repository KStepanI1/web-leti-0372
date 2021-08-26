import { TimetableController } from "../db/controllers/timetable.controller";
import { Router } from "express";

const timetableController = new TimetableController();
const timetableRouter = Router();

timetableRouter.get('/even/:dayNumber', timetableController.getEvenWeekTimetableForDay);
timetableRouter.get('/odd/:dayNumber', timetableController.getOddWeekTimetableForDay);
timetableRouter.get('/all/even', timetableController.getEvenWeekTimetable);
timetableRouter.get('/all/odd', timetableController.getOddWeekTimetable);

export { timetableRouter };