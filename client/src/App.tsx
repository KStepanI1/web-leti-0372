import React, {Suspense, useCallback, useContext } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { updateAllTimetableThunk, updateNearTimetableThunk } from './redux/reducers/timetableReducer';
import { useEffect } from 'react';
import { updateDateThunk } from './redux/reducers/dateReducer';
import { updateAllSubjectsThunk } from './redux/reducers/subjectReducer';
import { updateAllTeachersThunk } from './redux/reducers/teacherReducer';
import { useInnerWidth } from './helpers/useInnerWidth';
import { StateType } from './redux/store';

// pages
const MainPage = React.lazy(() => import('./components/pages/MainPage'));
const TimetablePage = React.lazy(() => import('./components/pages/TimetablePage'));
const TeachersPage = React.lazy(() => import('./components/pages/TeachersPage'));
const HomeworksPage = React.lazy(() => import('./components/pages/HomeworksPage'));


function App(): JSX.Element {
    const dispatch = useDispatch();
    const theme = localStorage.getItem("theme");

    useEffect(() => {
        dispatch(updateAllTimetableThunk());
        dispatch(updateDateThunk());
        dispatch(updateAllSubjectsThunk());
        dispatch(updateAllTeachersThunk());
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [theme])

    return (
        <Suspense fallback={'Загрузка...'}>
                <BrowserRouter>
                    <Switch>
                        <Route path={'/'} exact render={() => <MainPage />}/>
                        <Route path={'/timetable'} render={() => <TimetablePage />}/>
                        <Route path={'/teachers:subId?'} render={() => <TeachersPage />} />
                        <Route path={'/home-works'} render={() => <HomeworksPage />}/>
                    </Switch>
                </BrowserRouter>
        </Suspense>
    );
}

export default App;

