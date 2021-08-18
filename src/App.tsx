import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// pages
import { MainPage } from './components/pages/MainPage';


function App() {
    const [clockTime, setClockTime] = useState(new Date());
    let clockTimeSeconds: number = clockTime.getSeconds();

    function updateClockTime(): void {
        setClockTime(new Date());
    }

    setInterval(updateClockTime, 1000);

    useEffect(() => {
        if (clockTime.getHours() === 0 && clockTime.getMinutes() === 0 && clockTimeSeconds === 0) {
            // update near-timetable and currentDate
        }
    }, [clockTimeSeconds])

    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'}>
                    <MainPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
