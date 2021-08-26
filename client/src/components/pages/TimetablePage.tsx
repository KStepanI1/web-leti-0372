import React, { useState } from 'react';
import {Header} from "../organisms/Header";
import {Footer} from "../organisms/Footer";
import { DayTimetable } from "../organisms/DayTimetable";
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { TimetableSubject } from '../organisms/DayTimetable';


const TimetablePage = (): JSX.Element => {
    const allEvenTimetable = useSelector((state: StateType) => state.timetable.evenTimetable);
    const allOddTimetable = useSelector((state: StateType) => state.timetable.oddTimetable);
    const currentWeek = useSelector((state: StateType) => state.date.currentWeek);
    const [firstButtonActive, setFirstButtonActive] = useState(true);
    const [secondButtonActive, setSecondButtonActive] = useState(false);
    const [currentTimetable, setCurrentTimetable] = useState(currentWeek);

    const onClickFirstBtn = () => {
        if (firstButtonActive !== true) {
            setFirstButtonActive(true);
            setSecondButtonActive(false);
            setCurrentTimetable(1);
        }
    }

    const onClickSecondBtn = () => {
        if (secondButtonActive !== true) {
            setFirstButtonActive(false);
            setSecondButtonActive(true);
            setCurrentTimetable(2);
        }
    }

    const splitTimetableOnDays = (timetable: TimetableSubject[] | null) => {
        if (!timetable) { return []; }
        let monTimetable: TimetableSubject[] = [],
            tueTimetable: TimetableSubject[] = [],
            wedTimetable: TimetableSubject[] = [],
            thuTimetable: TimetableSubject[] = [],
            friTimetable: TimetableSubject[] = [],
            satTimetable: TimetableSubject[] = [],
            sunTimetable: TimetableSubject[] = [];
        timetable.forEach(subject => {
            switch(subject.weekday_id) {
                case 1: monTimetable.push(subject); break;
                case 2: tueTimetable.push(subject); break;
                case 3: wedTimetable.push(subject); break;
                case 4: thuTimetable.push(subject); break;
                case 5: friTimetable.push(subject); break;
                case 6: satTimetable.push(subject); break;
                case 7: sunTimetable.push(subject); break;
            }
        })

        return [monTimetable, tueTimetable, wedTimetable, thuTimetable, friTimetable, satTimetable, sunTimetable];
    }

    const evenTimetableSplited = splitTimetableOnDays(allEvenTimetable);
    const oddTimetableSplited = splitTimetableOnDays(allOddTimetable);

    return (
        <>
            <div className={'timetable-page'}>
                <Header/>
                <main className={'timetable-page__content'}>
                    <div className={'timetable-page__title-switch'}>
                        <h1 className={'timetable-page__title'}>
                            {'Расписание на'}
                            {currentTimetable === 1
                                ? <span className={'week-type'}> нечетную </span>
                                : <span className={'week-type'}> четную </span>
                            }
                            {'неделю'}
                        </h1>
                        <div className={'toggle-btn'}>
                            <button className={`toggle-btn__first ${firstButtonActive && 'active'}`}
                                    onClick={onClickFirstBtn} type={"button"}>
                                <h3>нечетная</h3>
                            </button>
                            <button className={`toggle-btn__second ${secondButtonActive && 'active'}`}
                                    onClick={onClickSecondBtn} type={"button"}>
                                <h3>четная</h3>
                            </button>
                        </div>
                    </div>
                    <div className={'timetable-page__timetable'}>
                        {currentTimetable === 1
                            ? oddTimetableSplited.map((timetableForDay, i) => {
                                return (<DayTimetable customName={null} dateName={null} timetable={timetableForDay}
                                                      dayNumber={(i + 1) % 7} key={`weekday_${i + 1}`}/>);
                            })
                            : evenTimetableSplited.map((timetableForDay, i) => {
                                return (<DayTimetable customName={null} dateName={null} timetable={timetableForDay}
                                                      dayNumber={(i + 1) % 7} key={`weekday_${i + 1}`}/>);
                            })
                        }
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default TimetablePage;