import { combineReducers } from "redux";
import { timetableReducer } from "./timetableReducer";
import { dateReducer } from "./dateReducer";
import { subjectReducer } from "./subjectReducer";
import { teacherReducer } from "./teacherReducer";
import { subjectModalReducer } from "./subjectModalReducer";

export const reducer = combineReducers({
    timetable: timetableReducer,
    date: dateReducer,
    subject: subjectReducer,
    teacher: teacherReducer,
    subjectModal: subjectModalReducer,
})