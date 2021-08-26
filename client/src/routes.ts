import React from 'react';

const MainPage = React.lazy(() => import('./components/pages/MainPage'));
const TimetablePage = React.lazy(() => import('./components/pages/TimetablePage'));


const routes = [
    {path: '/', exact: true, name: ''},
    {path: '/main-page', name: 'Главная страница', component: MainPage},
    {path: '/timetable', name: 'Расписание', component: TimetablePage}
];

export default routes;