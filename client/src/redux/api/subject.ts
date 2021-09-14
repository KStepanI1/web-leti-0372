import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7000/api/subject'
});


export const getSubjectById = async (id: number) => {
    const response = await instance.get(`/${id}`);
    return response;
}

export const getAllSubjects = async () => {
    const response = await instance.get(`/all`);
    return response;
}