import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {getNormalLessonType} from "../../helpers/helpers";
import { updateSubjectModalThunk } from "../../redux/reducers/subjectModalReducer";
import {SubjectType} from "../../redux/reducers/subjectReducer";
import { TeacherType } from "../../redux/reducers/teacherReducer";
import { StateType } from "../../redux/store";
import { TypeContainer } from "../atoms/TypeContainer";
import {TimetableSubjectProcessed } from "./DayTimetable";

export interface ZoomLinkType {
    id: number,
    type: string,
    code: string,
    password: string,
    url: string,
    subject_id: number
}

export interface SubjectModalProps {
    zoomLink: ZoomLinkType | null;
    teachers: TeacherType[] | null;
    dayName: string;
    subject: TimetableSubjectProcessed | null;
}

export const SubjectModal = ({zoomLink, subject, dayName, teachers}: SubjectModalProps) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: StateType) => state.subjectModal.isModalOpen);

    const closeModal = (event: any) => {
        if (event.target.classList.contains('subject-modal__body')
            || event.target.classList.contains('modal__close')) {
            dispatch(updateSubjectModalThunk(false));
        }

    }

    console.log(isModalOpen);

    const animationVariants = {
        opened: {
            opacity: 1,
            transition: {
                type: "tween"
            }
        },
        closed: {
            opacity: 0,
        }
    }

    return (
        <motion.div className={'subject-modal'}
                    variants={animationVariants}
                    initial={'closed'} animate={isModalOpen ? 'opened' : 'closed'}>
            <div className={'subject-modal__body'} onClick={closeModal}>
                <div className={'subject-modal__content'}>
                    <button className={'modal__close'} onClick={closeModal}></button>
                    <h2 className={'subject-modal__title'}>{dayName}</h2>
                    <div className={'subject__name-n-type'}>
                        <div className={'subject__name'}>{subject?.name || ''}</div>
                        <TypeContainer classes={'subject__type'}
                                       type={subject?.type || ''}
                                       typeRus={subject?.typeRus || ''} />
                    </div>

                    <div className={'subject__start-end'}>
                        { subject?.time.timeStart + " - " + subject?.time.timeEnd }
                    </div>

                    <table className={'subject__data'}>
                        <tbody>
                        <tr className={'subject-modal__field subject__teachers'}>
                            <td className={'table__title'}>
                                <h3 className={'subject-modal__subtitle'}>Преподаватель: </h3>
                            </td>
                            <td>
                                <div className={'teachers__names'}>
                                    {teachers &&
                                    teachers.map(teacher => {
                                        return <div className={'subject-modal__text teacher__name'}>
                                            <div>{teacher.last_name}</div>
                                            <div>{teacher.first_name}</div>
                                            <div>{teacher.middle_name}</div>
                                        </div>
                                    })
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr className={'subject-modal__field audience-number'}>
                            <td className={'table__title'}>
                                <h3 className={'subject-modal__subtitle'}>Аудитория: </h3>
                            </td>
                            <td>
                                <div className={'subject-modal__text'}>
                                    {subject?.audience_number}
                                </div>
                            </td>
                        </tr>

                        {zoomLink &&
                        <tr className={'subject-modal__field zoom-data'}>
                            <td className={'table__title'}>
                                <h3 className={'subject-modal__subtitle'}>Zoom: </h3>
                            </td>
                            <td>
                                <div className={'subject-modal__text'}>
                                    <div className={'zoom-data__part'}>
                                        <span>код: </span>
                                        <div>{zoomLink.code}</div>
                                    </div>
                                    <div className={'zoom-data__part'}>
                                        <span>пароль: </span>
                                        <div>{zoomLink.password}</div>
                                    </div>
                                    <div className={'zoom-data__part'}>
                                        <span>ссылка: </span>
                                        <div>
                                            <a href={zoomLink.url} target={'_blank'}>перейти</a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        }
                        </tbody>
                    </table>



                    {/*<div className={'modal__main'}>
                        <div className={'zoom-data code'}>
                            <h3 className={'modal__subtitle'}>Код: </h3>
                            <div>{zoomLink.code}</div>
                        </div>
                        <div className={'zoom-data password'}>
                            <h3 className={'modal__subtitle'}>Пароль: </h3>
                            <div>{zoomLink.password}</div>
                        </div>
                        <div className={'zoom-data link'}>
                            <h3 className={'modal__subtitle'}>Ссылка: </h3>
                            <div><a className={'zoom-data__link'}
                                href={zoomLink.url}
                                    target={'_blank'}
                                    title={'Перейти в zoom'}>Перейти в ZOOM</a></div>
                        </div>
                    </div>*/}
                </div>
            </div>
        </motion.div>
    );
}