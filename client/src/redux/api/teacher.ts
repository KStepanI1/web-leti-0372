import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7000/api/teacher'
});


export const getAllTeachers = async () => {
    const response = await instance.get('/all');
    return response;
}

export const getTeacherById = async (id: number) => {
    const response = await instance.get(`/${id}`);
    return response;
}