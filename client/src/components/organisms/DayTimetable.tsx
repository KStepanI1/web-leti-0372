import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TimetablePreloader } from "../atoms/TimetablePreloader";

export interface DayTimetableProps {
    customName: string | null;
    timetable: TimetableSubject[] | null;
    dayNumber: number;
    dateName: string | null;
};

export interface TimetableSubject {
    id: number;
    weekday_id: number;
    audience_number: string | null;
    lesson_number: string;
    subject_id: number;
    type: string;
    week_parity: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface TimetableSubjectProcessed extends TimetableSubject {
    dayName: string;
    typeRus: string;
    time: { timeStart: string; timeEnd: string; };
}

export const DayTimetable = ({timetable, customName, dayNumber, dateName}: DayTimetableProps): JSX.Element => {
    const [timetableProcessed, setTimetableProcessed] = useState<TimetableSubjectProcessed[] | null>(null);

    const getNormalDay = (dayNumber: number) => {
        switch(dayNumber) {
            case 0: return 'Воскресенье';
            case 1: return 'Понедельник';
            case 2: return 'Вторник';
            case 3: return 'Среда';
            case 4: return 'Четверг';
            case 5: return 'Пятница';
            case 6: return 'Суббота';
            default: return '';
        }
    }

    const getNormalLessonType = (type: string) => {
        switch(type) {
            case "lec": return 'Лек';
            case "prac": return "Пр";
            case "seminar": return "Сем";
            case "lab": return "Лаб";
            default: return '';
        }
    }

    const getSubjectTime = (lessonNumber: number) => {
        switch(lessonNumber) {
            case 1: return {timeStart: '8:00', timeEnd: '9:25'}
            case 2: return {timeStart: '9:40', timeEnd: '11:05'}
            case 3: return {timeStart: '11:35', timeEnd: '13:00'}
            case 4: return {timeStart: '13:45', timeEnd: '15:10'}
            case 5: return {timeStart: '15:40', timeEnd: '17:05'}
            case 6: return {timeStart: '17:20', timeEnd: '18:45'}
            case 7: return {timeStart: '19:00', timeEnd: '20:25'}
            default: return {timeStart: '', timeEnd: ''};
        }
    }


    useEffect(() => {
        function timetableProcess (timetable: TimetableSubject[] | null) {
            if (!timetable) { return timetable; }
            else {
                return timetable.map(async subject =>  {
                    return {
                        ...subject,
                        dayName: getNormalDay(subject.weekday_id),
                        typeRus: getNormalLessonType(subject.type),
                        time: getSubjectTime(+subject.lesson_number)
                    };
                })
            }

        };

        function addEmptyLessons (timetable: Array<TimetableSubjectProcessed>) {
            if (timetable.length === 0) {
                return timetable;
            }
            let timetableWithEmptyLessons: TimetableSubjectProcessed[] = [...timetable];
            let emptyLessons: number[] = [];
            for (let i = 1; i <= 7; i++) {
                let current = timetable.find(e => +e.lesson_number === i);
                if (!current) {
                    emptyLessons.push(i);
                }
            }
            emptyLessons.forEach(lesson => {
                let emptyLesson: TimetableSubjectProcessed = {
                    id: 0,
                    lesson_number: `${lesson}`,
                    subject_id: 0,
                    name: '',
                    weekday_id: 0,
                    audience_number: '',
                    dayName: getNormalDay(dayNumber % 6),
                    type: '',
                    week_parity: '',
                    typeRus: '',
                    time: {timeStart: '', timeEnd: ''},
                    created_at: new Date(),
                    updated_at: new Date()
                };
                timetableWithEmptyLessons.push(emptyLesson);
            })
            return timetableWithEmptyLessons;
        }
        const timetablePromises = timetableProcess(timetable);

        if (timetablePromises) {
            Promise.all(timetablePromises)
                .then(timetableProc => {
                    timetableProc = addEmptyLessons(timetableProc);
                    timetableProc.sort((a,
                                        b) => +a.lesson_number - +b.lesson_number);
                    setTimetableProcessed(timetableProc);
                })
        }
    }, [timetable, dayNumber]);

    const dayName = getNormalDay(dayNumber);

    return <div className={'day-timetable'}>
        <h2 className={'day-timetable__title'}>
            {customName
                ? (dateName ? dayName + " (" + customName + "), " + dateName : dayName + " (" + customName + ")")
                : (dateName ? dayName + ",   " + dateName : dayName)}
        </h2>
        {timetable && timetableProcessed ?
            timetable.length === 0
            ? <div className={'day-timetable__no-table'}>
                В этот день занятий нет
            </div>
            : <table className={'day-timetable__lessons'}>
                <thead>
                <tr className={'day-timetable__thead'}>
                    <td></td>
                    <td><h3 className={'thead__field'}>№</h3></td>
                    <td><h3 className={'thead__field'}>Название</h3></td>
                    <td><h3 className={'thead__field'}>Аудитория</h3></td>
                    <td><h3 className={'thead__field'}>Тип</h3></td>
                </tr>
                </thead>
                <tbody>
                {timetableProcessed.map((subject, i) => {
                        if (subject.name === '') {
                            return <tr key={`emptylesson_${subject.lesson_number}`} className={'day-timetable__timeout'}>
                                <td className={'timeout__field'} colSpan={4}>
                                    <div className={'timeout__text'}>Нет пары</div>
                                </td>
                            </tr>
                        } else {
                            return <tr key={`lesson_${subject.lesson_number}`} className={'day-timetable__subject'}>
                                <td className={'subject__field time'}>{subject.time.timeStart}</td>
                                <td className={'subject__filed number'}>{subject.lesson_number}</td>
                                <td className={'subject__field name'}>{subject.name}</td>
                                <td className={'subject__field audience_number'}>{subject.audience_number || ''}</td>
                                <td className={'subject__field'}>
                                    <div className={`subject__type ${subject.type}`}>
                                        <h3 className={'type-name'}>{subject.typeRus}</h3>
                                    </div>
                                </td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
            : <TimetablePreloader />
        }
    </div>;
};