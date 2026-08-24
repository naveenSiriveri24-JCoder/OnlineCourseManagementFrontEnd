import api from "../api/axiosConfig";

export const getAllStudents = async() => {

    const response = await api.get("/st/get-all");

    return response;
}