import { Dispatch } from "redux";
import { TimetableSubject } from "../../components/organisms/DayTimetable";
import { getEvenTimetable, getEvenTimetableFor, getOddTimetable, getOddTimetableFor } from "../api/timetable";

const UPDATE_ALL_TIMETABLE = "UPDATE_ALL_TIMETABLE";
const UPDATE_NEAR_TIMETABLE = "UPDATE_NEAR_TIMETABLE";

interface TimetableReducerActionType {
    type: typeof UPDATE_ALL_TIMETABLE | typeof UPDATE_NEAR_TIMETABLE;
    oddTimetable: TimetableSubject[];
    evenTimetable: TimetableSubject[];
    todayTimetable: TimetableSubject[];
    tomorrowTimetable: TimetableSubject[];
};

export const timetableReducer = (state = {oddTimetable: null, evenTimetable: null}, action: TimetableReducerActionType) => {
    switch (action.type) {
        case "UPDATE_ALL_TIMETABLE":
            return {
                ...state,
                oddTimetable: action.oddTimetable,
                evenTimetable: action.evenTimetable
            };
        case "UPDATE_NEAR_TIMETABLE":
            return {
                ...state,
                todayTimetable: action.todayTimetable,
                tomorrowTimetable: action.tomorrowTimetable
            };
        default:
            return state;
    };
};

const updateAllTimetableActionCreator = (oddTimetable: TimetableSubject[], evenTimetable: TimetableSubject[]) => {
    return {type: UPDATE_ALL_TIMETABLE, oddTimetable: oddTimetable, evenTimetable: evenTimetable};
}

const updateNearTimetableActionCreator = (todayTimetable: TimetableSubject[], tomorrowTimetable: TimetableSubject[]) => {
    return {type: UPDATE_NEAR_TIMETABLE, todayTimetable: todayTimetable, tomorrowTimetable: tomorrowTimetable};
}

export const updateAllTimetableThunk = () => (dispatch: Dispatch) => {
    const evenTimetable = getEvenTimetable();
    const oddTimetable = getOddTimetable();
    Promise.all([evenTimetable, oddTimetable])
        .then(response => dispatch(updateAllTimetableActionCreator(response[0].data, response[1].data)))
        .catch(error => console.log(error));
};

export const updateNearTimetableThunk = (currentWeek: number) => (dispatch: Dispatch) => {
    const todayDayNumber = new Date().getDay();
    const tomorrowDayNumber = (new Date(+(new Date()) + 86400000)).getDay();
    let todayTimetable = null;
    let tomorrowTimetable = null;
    if (currentWeek === 1 && tomorrowDayNumber !== 1) {
        todayTimetable = getOddTimetableFor(todayDayNumber);
        tomorrowTimetable = getOddTimetableFor(tomorrowDayNumber);
    } else if (currentWeek === 1 && tomorrowDayNumber === 1) {
        todayTimetable = getOddTimetableFor(todayDayNumber);
        tomorrowTimetable = getEvenTimetableFor(tomorrowDayNumber);
    } else if (currentWeek === 2 && tomorrowDayNumber !== 1) {
        todayTimetable = getEvenTimetableFor(todayDayNumber);
        tomorrowTimetable = getEvenTimetableFor(tomorrowDayNumber);
    } else if (currentWeek === 2 && tomorrowDayNumber === 1) {
        todayTimetable = getEvenTimetableFor(todayDayNumber);
        tomorrowTimetable = getOddTimetableFor(tomorrowDayNumber);
    } else {
        console.log('Ошибочка');
    }
    if (todayTimetable && tomorrowTimetable) {
        Promise.all([todayTimetable, tomorrowTimetable])
            .then(response => dispatch(updateNearTimetableActionCreator(response[0].data, response[1].data)))
            .catch(error => console.log(error));
    } else {
        return;
    }
};


