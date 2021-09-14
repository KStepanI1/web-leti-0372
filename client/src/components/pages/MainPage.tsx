import React, {useEffect, useCallback} from 'react';
import {Header} from "../organisms/Header";
import {Footer} from "../organisms/Footer";
import {NearTimetable} from "../organisms/NearTimetable";
import {useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { updateNearTimetableThunk } from '../../redux/reducers/timetableReducer';

import { motion } from 'framer-motion';
import { SubjectModal } from '../organisms/SubjectModal';

const MainPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const todayTimetable = useSelector((state: StateType) => state.timetable.todayTimetable);
    const tomorrowTimetable = useSelector((state: StateType) => state.timetable.tomorrowTimetable);
    const currentWeek = useSelector((state: StateType) => state.date.currentWeek);

    useEffect(() => {
        dispatch(updateNearTimetableThunk(currentWeek));
    }, [currentWeek]);

    const dateTomorrow = new Date( +(new Date()) + 86400000);
    const dateToday = new Date();

    const monthToday = dateTomorrow.getMonth();
    const monthTomorrow = dateToday.getMonth();

    const dateNumberToday = dateToday.getDate();
    const dateNumberTomorrow = dateTomorrow.getDate();

    const dayNumberToday = dateToday.getDay();

    const getDayName = (dayNumber: number) => {
        switch(dayNumber) {
            case 0: return 'Вс.';
            case 1: return 'Пн.';
            case 2: return 'Вт.';
            case 3: return 'Ср.';
            case 4: return 'Чт.';
            case 5: return 'Пт.';
            case 6: return 'Сб.';
            default: return '';
        }
    }

    const getMonthName = (monthNumber: number) => {
        switch (monthNumber) {
            case 0: return 'Января';
            case 1: return 'Февраля';
            case 2: return 'Марта';
            case 3: return 'Апреля';
            case 4: return 'Мая';
            case 5: return 'Июня';
            case 6: return 'Июля';
            case 7: return 'Августа';
            case 8: return 'Сентября';
            case 9: return 'Октября';
            case 10: return 'Ноября';
            case 11: return 'Декабря';
            default: return '';
        }
    }

    const getWeekName = (weekNumber: number) => {
        switch(weekNumber) {
            case 1: return 'Нечетная';
            case 2: return 'Четная';
            default: return '';
        }
    }

    const dayNameToday = getDayName(dayNumberToday);

    const monthNameToday = getMonthName(monthToday);
    const monthNameTommorow = getMonthName(monthTomorrow);

    const dateNameToday = dateNumberToday + " " + monthNameToday;
    const dateNameTomorrow = dateNumberTomorrow + " " + monthNameTommorow;

    const weekName = getWeekName(currentWeek);


    // MODAL
    const subjectModal = useSelector((state: StateType) => state.subjectModal);

    return (
        <>
            <div className={`main-page`}>
                <Header/>
                <main className={'main-page__content'}>
                    <NearTimetable todayTimetable={todayTimetable} tomorrowTimetable={tomorrowTimetable}
                                       dateNameToday={dateNameToday} dateNameTomorrow={dateNameTomorrow}/>
                    {subjectModal.isModalOpen && <SubjectModal subject={subjectModal.timetableSubject}
                                                               zoomLink={subjectModal.zoomLink}
                                                               teachers={subjectModal.teachers}
                                                               dayName={subjectModal.dayName || ''}/>}
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default MainPage;