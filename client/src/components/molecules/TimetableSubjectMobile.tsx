import {useState} from "react";
import {TeacherType} from "../../redux/reducers/teacherReducer";
import {TimetableSubjectProcessed} from "../organisms/DayTimetable";
import Zoom from "../../assets/images/zoom.svg";
import {useDispatch} from "react-redux";
import {TypeContainer} from "../atoms/TypeContainer";
import {SubjectModal, ZoomLinkType } from "../organisms/SubjectModal";
import { updateSubjectModalThunk } from "../../redux/reducers/subjectModalReducer";

interface TimetableSubjectProps {
    subject: TimetableSubjectProcessed;
    teachers: TeacherType[];
    dayName: string;
}


export const TimetableSubjectMobile = ({subject, teachers, dayName}: TimetableSubjectProps) => {
    const dispatch = useDispatch();


    const openSubjectModal = () => {
        const zoomLink = subject.zoomLinks.find((e: ZoomLinkType) =>
            e.subject_id === subject.subject_id &&
            e.type === subject.type
        )
        dispatch(updateSubjectModalThunk(true, subject, teachers, zoomLink, dayName));
    }

    return (
            <tr className={'timetable-subject-mobile'} onClick={openSubjectModal}>
                <td className={'subject__field time'}>{subject.time.timeStart}</td>
                <td className={'subject__field name'}>{subject.name}</td>
                <td className={'subject__field'}>
                    <TypeContainer classes={'subject__type'}
                                   type={subject.type}
                                   typeRus={subject.typeRus}/>
                </td>
            </tr>
    );
}