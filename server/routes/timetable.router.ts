import {TimetableController} from "../db/controllers/timetable.controller";
import { Router } from "express";

const timetableController = new TimetableController();
const timetableRouter = Router();

timetableRouter.get('/even/:dayNumber', timetableController.getEvenTimetableForDay);
timetableRouter.get('/odd/:dayNumber', timetableController.getOddTimetableForDay);
timetableRouter.get('/all/even', timetableController.getAllEvenTimetable);
timetableRouter.get('/all/odd', timetableController.getAllOddTimetable);

export { timetableRouter };