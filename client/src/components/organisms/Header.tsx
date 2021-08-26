import React from 'react';
import { DateToday } from '../molecules/DateToday';
import {HeaderNav} from "../molecules/HeaderNav";


const Header = (): JSX.Element => {

    const navItems = [
        {link: '/timetable', name: 'Расписание'},
        {link: '/teachers', name: 'Преподаватели'},
        {link: '/wiretapping', name: 'Прослушка'},
    ]

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

    const dateNumberToday = new Date().getDate();
    const monthNameToday = getMonthName(new Date().getMonth());

    return (
        <>
            <header className={`header`}>
                <div className={'header__container'}>
                    <HeaderNav navItems={navItems}/>
                </div>
            </header>
            <DateToday date={dateNumberToday} monthName={monthNameToday}/>
        </>
    );
};

export {Header};