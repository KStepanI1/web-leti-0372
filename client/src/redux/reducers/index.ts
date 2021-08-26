import { combineReducers } from "redux";
import { timetableReducer } from "./timetableReducer";
import { dateReducer } from "./dateReducer";

export const reducer = combineReducers({
    timetable: timetableReducer,
    date: dateReducer
})