import { Dispatch } from "redux";
import { TimetableSubjectProcessed } from "../../components/organisms/DayTimetable";
import { ZoomLinkType } from "../../components/organisms/SubjectModal";
import { getAllSubjects } from "../api/subject";
import { TeacherType } from "./teacherReducer";

const UPDATE_MODAL = "UPDATE_MODAL";

interface SubjectModalReducerAction {
    type: typeof UPDATE_MODAL;
    isModalOpen: boolean;
    timetableSubject: TimetableSubjectProcessed | null;
    zoomLink: ZoomLinkType | null;
    teachers: TeacherType[] | null;
    dayName: string | null;
}

const initialState = {
    isModalOpen: false as boolean,
    timetableSubject: null as TimetableSubjectProcessed | null,
    zoomLink: null as ZoomLinkType | null,
    teachers: null as TeacherType[] | null,
    dayName: null as string | null,
}


export const subjectModalReducer = (state = initialState,
                               action: SubjectModalReducerAction): typeof initialState => {
    switch(action.type) {
        case "UPDATE_MODAL":
            return {
                ...state,
                isModalOpen: action.isModalOpen,
                teachers: action.teachers,
                zoomLink: action.zoomLink,
                dayName: action.dayName,
                timetableSubject: action.timetableSubject
            };
        default:
            return state;
    };
};

// AC - Action Creator

const updateModalAC = (isModalOpen: boolean,
                       timetableSubject: TimetableSubjectProcessed | null,
                       teachers: TeacherType[] | null,
                       zoomLink: ZoomLinkType | null,
                       dayName: string | null): SubjectModalReducerAction =>
    ({
        type: UPDATE_MODAL,
        isModalOpen,
        timetableSubject,
        teachers,
        zoomLink,
        dayName
    });

export const updateSubjectModalThunk = (isModalOpen: boolean = false,
                                       timetableSubject: TimetableSubjectProcessed | null = null,
                                       teachers: TeacherType[] | null = null,
                                       zoomLink: ZoomLinkType | null = null,
                                       dayName: string | null = null) => (dispatch: Dispatch) => {
    dispatch(updateModalAC(isModalOpen, timetableSubject, teachers, zoomLink, dayName));
};