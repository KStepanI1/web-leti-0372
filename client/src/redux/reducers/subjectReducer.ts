import { Dispatch } from "redux";
import { getAllSubjects } from "../api/subject";

const UPDATE_ALL_SUBJECTS = "UPDATE_ALL_SUBJECTS";

export interface SubjectType {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface SubjectsReducerActionType {
    type: typeof UPDATE_ALL_SUBJECTS;
    allSubjects: SubjectType[];
}

const initialState = {
    allSubjects: null as SubjectType[] | null
}


export const subjectReducer = (state = initialState,
                               action: SubjectsReducerActionType) => {
    switch(action.type) {
        case "UPDATE_ALL_SUBJECTS":
            return {
                ...state,
                allSubjects: action.allSubjects
            };
        default:
            return state;
    };
};

// AC - Action Creator

const updateAllSubjectsAC = (allSubjects: any): SubjectsReducerActionType =>
    ({ type: UPDATE_ALL_SUBJECTS, allSubjects: allSubjects });

export const updateAllSubjectsThunk = () => (dispatch: Dispatch) => {

    const allSubjects = getAllSubjects();

    Promise.all([allSubjects])
        .then(response => {
            dispatch(updateAllSubjectsAC(response[0].data))
        })
        .catch(error => console.log(error));
};