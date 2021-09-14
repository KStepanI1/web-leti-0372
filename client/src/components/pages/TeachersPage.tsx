import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, NavLink, useHistory, useParams} from "react-router-dom";
import {StateType} from "../../redux/store";
import {TeacherCard} from "../organisms/TeacherCard";
import {Footer} from "../organisms/Footer";
import {Header} from "../organisms/Header";
import { Dropdown } from "../molecules/Dropdown";

const TeachersPage = () => {
    const allSubjects = useSelector((state: StateType) => state.subject.allSubjects);
    const allTeachers = useSelector((state: StateType) => state.teacher.allTeachers);
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const history = useHistory();

    // @ts-ignore
    const subParam = params.get('sub') === null ? -1 : +params.get('sub');

    const newOptionsState = (activeId: string) => {
        let options: { value: string, label: string }[] = [];
        if (allSubjects) {
            allSubjects.map((subject, i) => {
                    options.push({value: `${subject.id}`, label: `${subject.name}`});
            })
        }
            options.unshift({value: '-1', label: 'Все предметы'});
        return options;
    };

    const [options, setOptions] = useState<{ value: string, label: string }[] | null>(null);

    useEffect(() => {
        setOptions(newOptionsState('-1'));
    }, [allSubjects]);

    const onChangeSelectedValue = (evemt: any) => {
        history.push(evemt.target.value === '-1' ? '/teachers' : `?sub=${evemt.target.value}`)
        setOptions(newOptionsState(evemt.target.value));
    };

    return (
        <div className={`teachers-page`}>
            <Header/>
            <main className={'teachers-page__content'}>
                <h1 className={'teachers-page__title'}>Преподаватели</h1>
                <div className={'teachers'}>
                    <div className={'subjects-box'}>
                        <Dropdown items={options || []} onChangeCallback={onChangeSelectedValue}/>
                    </div>
                    <div className={'teachers-list'}>
                        {allTeachers && allTeachers !== undefined && allSubjects
                            ? (subParam === -1
                                ? allTeachers.map(teacher => {
                                    return (
                                        <TeacherCard teacher={teacher}
                                                     subject={allSubjects.find(e => e.id === 1)?.name || ''}
                                                     key={`teacher-card_${teacher.id}`}/>
                                    );
                                })
                                : allTeachers.map(teacher => {
                                    if (subParam === teacher.subject_id) {
                                        return (
                                            <TeacherCard teacher={teacher}
                                                         subject={allSubjects.find(e => e.id === 1)?.name || ''}
                                                         key={`teacher-card_${teacher.id}`}/>
                                        );
                                    }
                                }))
                            : <div>Ни одного учителя не было добавлено</div>
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default TeachersPage;