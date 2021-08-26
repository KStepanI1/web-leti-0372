import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';

interface DateTodayProps {
    monthName: string;
    date: number;
}

export const DateToday = (props: DateTodayProps) => {
    let dateFromEtu = useSelector((state: StateType) => state.date.dateFromEtu);


    if (dateFromEtu.split(" ")[1] === '1') {
        dateFromEtu = dateFromEtu.replace('1', 'Нечетная');
    } else {
        dateFromEtu = dateFromEtu.replace('2', 'Четная')
    }

    dateFromEtu = dateFromEtu.replace(',', '.');

    return <div className={'date-today'}>
        <h2 className={'date-today__text'}>
            {'Сегодня: ' + props.date + " " + props.monthName +
            " , " + dateFromEtu}
        </h2>
    </div>
}