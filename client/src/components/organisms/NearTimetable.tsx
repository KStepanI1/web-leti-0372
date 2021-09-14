import { motion } from 'framer-motion';
import React  from 'react';
import { DayTimetable, TimetableSubjectType } from './DayTimetable';

interface NearTimetableProps {
    todayTimetable: TimetableSubjectType[] | null;
    tomorrowTimetable: TimetableSubjectType[] | null;
    dateNameToday: string;
    dateNameTomorrow: string;
};

export const NearTimetable = ({ todayTimetable, tomorrowTimetable, dateNameToday, dateNameTomorrow }: NearTimetableProps): JSX.Element => {
    const currentDay = new Date().getDay();

    return <div className={'near-timetable'}>
        <h1 className={'near-timetable__title'}>Ближайшее расписание</h1>
        <motion.div layout className={'near-timetable__content'}>
            <DayTimetable dayNumber={currentDay % 7} timetable={todayTimetable} customName={'Сегодня'} dateName={dateNameToday}/>
            <DayTimetable dayNumber={(currentDay+1) % 7} timetable={tomorrowTimetable} customName={'Завтра'} dateName={dateNameTomorrow}/>
        </motion.div>

    </div>
};