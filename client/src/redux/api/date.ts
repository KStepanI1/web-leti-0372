import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7000/api/week-number'
});

export const getDateFromEtu = async () => {
    const response = await instance.get('/');
    return response;
};