import React, {Suspense, useCallback } from 'react';
import {useDispatch} from "react-redux";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { updateAllTimetableThunk } from './redux/reducers/timetableReducer';
import { useEffect } from 'react';
import { updateDateThunk } from './redux/reducers/dateReducer';

// pages
const MainPage = React.lazy(() => import('./components/pages/MainPage'));
const TimetablePage = React.lazy(() => import('./components/pages/TimetablePage'));



function App(): JSX.Element {
    const dispatch = useDispatch();


    const updateAllTimetable = useCallback(() => {
        dispatch(updateAllTimetableThunk());
    }, [dispatch]);

    const updateDate = useCallback(() => {
        dispatch(updateDateThunk());
    }, [dispatch])

    useEffect(() => {
        updateAllTimetable();
        updateDate();
    }, [updateAllTimetable, updateDate]);

    return (
        <Suspense fallback={'Загрузка...'}>
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact render={() => <MainPage />}/>
                    <Route path={'/timetable'} render={() => <TimetablePage />}/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;

