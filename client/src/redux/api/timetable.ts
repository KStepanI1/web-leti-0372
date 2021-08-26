import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:7000/api/timetable'
});


export const getEvenTimetableFor = async (dayNumber: number) => {
    const response = await instance.get(`/even/${dayNumber % 7}`);
    return response;
}

export const getOddTimetableFor = async (dayNumber: number) => {
    const response = await instance.get(`/odd/${dayNumber % 7}`);
    return response;
}

export const getEvenTimetable = async () => {
    const response = await instance.get('/all/even');
    return response;
}

export const getOddTimetable = async () => {
    const response = await instance.get('/all/odd');
    return response;
}





