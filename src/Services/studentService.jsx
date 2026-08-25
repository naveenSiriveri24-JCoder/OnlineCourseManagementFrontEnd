import api from "../api/axiosConfig";

export const getAllStudents = async() => {

    const response = await api.get("/st/get-all");

    return response;
}

export const deleteStudentById = async(studentId) =>{
    return await api.delete(`/st/delete/${studentId}`)
}

export const getStudentById = async(studentId) =>{
    return await api.get(`/st/get/${studentId}`)
}