import { Dispatch } from "redux";
import { getAllTeachers } from "../api/teacher";

const UPDATE_ALL_TEACHERS = "UPDATE_ALL_TEACHERS";

export interface TeacherType {
    id: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    type: string;
    email: string;
    subject_id: number;
    created_at: Date;
    updated_at: Date;
};

interface TeacherReducerActionType {
    type: typeof UPDATE_ALL_TEACHERS;
    allTeachers: TeacherType[];
};

const initialState = {
    allSubjects: null
};

export const teacherReducer = (state = initialState, action: TeacherReducerActionType) => {
    switch(action.type) {
        case "UPDATE_ALL_TEACHERS":
            return {
                ...state,
                allTeachers: action.allTeachers
            };
        default:
            return state;
    };
};

// AC - action creactor

const updateAllTeachersAC = (allTeachers: TeacherType[]) =>
    ({ type: UPDATE_ALL_TEACHERS, allTeachers: allTeachers })

export const updateAllTeachersThunk = () => (dispatch: Dispatch) => {

    const allTeachers = getAllTeachers();

    Promise.all([allTeachers])
        .then(response => {
            dispatch(updateAllTeachersAC(response[0].data));
        })

}


