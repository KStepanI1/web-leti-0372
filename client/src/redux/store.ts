import {
    applyMiddleware,
    createStore
} from 'redux';

import ReduxThunk  from "redux-thunk";
import { TimetableSubject } from '../components/organisms/DayTimetable';
import { reducer } from './reducers';

export interface StateType {
    timetable: {
        oddTimetable: TimetableSubject[] | null;
        evenTimetable: TimetableSubject[] | null;
        todayTimetable: TimetableSubject[] | null;
        tomorrowTimetable: TimetableSubject[] | null;
    }
    date: {
        currentWeek: number;
        dateFromEtu: string;
    }
};

export const initialState = {
    currentWeek: 1
}

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export {store};