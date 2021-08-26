import { Dispatch } from "redux";
import { getDateFromEtu } from "../api/date";

const UPDATE_DATE = "UPDATE_DATE";

const initialState = {
    currentWeek: 1,
    dateFromEtu: ''
};

interface DateActionType {
    type: typeof UPDATE_DATE;
    dateFromEtu: string;
    currentWeek: number;
};

export const dateReducer = (state = initialState, action: DateActionType) => {
    switch (action.type) {
        case "UPDATE_DATE":
            return {
                ...state,
                dateFromEtu: action.dateFromEtu,
                currentWeek: +action.dateFromEtu.split(" ")[1]
            };
        default:
            return state;
    }
    ;
}


const updateDateActionCreator = (dateFromEtu: any) => ({type: UPDATE_DATE, dateFromEtu: dateFromEtu});

export const updateDateThunk = () => (dispatch: Dispatch) => {

    const dateFromEtu = getDateFromEtu();
    console.log(dateFromEtu);
    Promise.all([dateFromEtu]).then(response => {
        dispatch(updateDateActionCreator(response[0].data))
    });

}