import api from "../api/axiosConfig";

const userString = localStorage.getItem("user");
    const user = userString
    ? JSON.parse(userString)
    : null;

export const getEnrollements = async (studentId)=>{
    const response = await api.get(`/enrollment/enrollmentsByStudentId/${studentId}`);
    return response.data;
}

//post call with requestBody
export const enrollCourse = async (courseId)=>{
    const enrollment = {
        studentId: user.id,
        courseId
    };
    
   return await api.post("/enrollment/enroll", enrollment);
}

export const getAllEnrollments = async () =>{
    const response = await api.get("/enrollment/getAllEnrollments");
    return response;
}

export const deleteEnrollment = async (enrollmentId) => {
    const response = await api.delete(`/enrollment/delete/${enrollmentId}`);
    return response;
}

export const getEnrollmentById = async (enrollmentId) => {
    console.log(enrollmentId)
    const response = await api.get(`/enrollment/getById/${enrollmentId}`);
    console.log(response.data);
    return response;
}

export const extendEnrollmentDuration = async (enrollmentDuration, enrollment)=>{
   const courseId = enrollment.enrollmentId;
    const extendEnrollment = {
        enrollmentId : courseId,
        enrollmentDuration : enrollmentDuration

   }
    const response = await api.put ("/enrollment/updateEnrollmentDuration", extendEnrollment)
}