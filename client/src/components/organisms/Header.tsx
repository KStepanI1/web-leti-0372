import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {useInnerWidth} from '../../helpers/useInnerWidth';
import { StateType } from '../../redux/store';
import {DateToday} from '../molecules/DateToday';
import {HeaderNav} from "../molecules/HeaderNav";


const Header = (): JSX.Element => {
    const currentInnerWidth = useInnerWidth();
    const dispatch = useDispatch();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuActive(false);
        document.body.classList.remove('lock');
    }, [location])

    const menuBackgroundVariants = {
        opened: {
            opacity: 1,
            transition: {
                type: 'tween',
            },
        },
        closed: {
            opacity: 0,
        }
    }

    const menuContentVariants = {
        opened: {
            x: 0,
            transition: {
                type: 'tween'
            }
        },
        closed: {
            x: '100%',
        }
    }

    const navItems = [
        {link: '/timetable', name: 'Расписание'},
        {link: '/home-works', name: 'Домашние задания'},
        {link: '/teachers', name: 'Преподаватели'},
    ]

    const getMonthName = (monthNumber: number) => {
        switch (monthNumber) {
            case 0:return 'Января';
            case 1:return 'Февраля';
            case 2:return 'Марта';
            case 3:return 'Апреля';
            case 4:return 'Мая';
            case 5:return 'Июня';
            case 6:return 'Июля';
            case 7:return 'Августа';
            case 8:return 'Сентября';
            case 9:return 'Октября';
            case 10:return 'Ноября';
            case 11:return 'Декабря';
            default:return '';
        }
    }

    const toggleMenu = (event: any) => {
        if (document.body.classList.contains('lock')) {
            document.body.classList.remove('lock');
            setIsMenuActive(false);
        } else {
            document.body.classList.add('lock');
            setIsMenuActive(true);
        }

    }


    const dateNumberToday = new Date().getDate();
    const monthNameToday = getMonthName(new Date().getMonth());

    return (
        <>
            <header className={`header`}>
                <div className={'header__container'}>
                    {currentInnerWidth < 768
                        ? <>
                            <button className={`header__burger ${isMenuActive ? 'burger_active' : ''}`}
                                    onClick={toggleMenu}>
                                <span></span>
                            </button>
                            <motion.div className={`mobile-menu`}>
                                    <motion.div className={`mobile-menu__body`}
                                                variants={menuBackgroundVariants}
                                                initial={'closed'}
                                                animate={isMenuActive ? 'opened' : 'closed'}
                                        style={!isMenuActive ? { width: 0, height: 0 } : {}}>
                                        <motion.div className={'mobile-menu__content'}
                                                    variants={menuContentVariants}
                                                    initial={'closed'}
                                                    animate={isMenuActive ? 'opened' : 'closed'}>
                                            <HeaderNav navItems={navItems}/>
                                        </motion.div>
                                    </motion.div>
                            </motion.div>
                        </>
                        : <HeaderNav navItems={navItems}/>}

                </div>
            </header>
            <DateToday date={dateNumberToday} monthName={monthNameToday}/>
        </>
    );
};

export {Header};


