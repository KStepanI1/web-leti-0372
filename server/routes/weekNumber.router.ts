import { parseWeekNumber } from "../weekNumberParser";
import { Router } from "express";

const weekNumberRouter = Router();

weekNumberRouter.get('/', parseWeekNumber);

export { weekNumberRouter };