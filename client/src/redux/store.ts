import {
    applyMiddleware,
    createStore
} from 'redux';

import ReduxThunk  from "redux-thunk";
import {TimetableSubjectProcessed, TimetableSubjectType } from '../components/organisms/DayTimetable';
import { ZoomLinkType } from '../components/organisms/SubjectModal';
import { reducer } from './reducers';
import { SubjectType } from './reducers/subjectReducer';
import { TeacherType } from './reducers/teacherReducer';

export interface StateType {
    timetable: {
        oddTimetable: TimetableSubjectType[] | null;
        evenTimetable: TimetableSubjectType[] | null;
        todayTimetable: TimetableSubjectType[] | null;
        tomorrowTimetable: TimetableSubjectType[] | null;
    };
    date: {
        currentWeek: number;
        dateFromEtu: string;
    };
    subject: { allSubjects: SubjectType[]; };
    teacher: { allTeachers: TeacherType[]; };
    subjectModal: {
        isModalOpen: boolean,
        teachers: TeacherType[] | null,
        timetableSubject: TimetableSubjectProcessed | null,
        zoomLink: ZoomLinkType | null,
        dayName: string | null
    }
};

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export {store};