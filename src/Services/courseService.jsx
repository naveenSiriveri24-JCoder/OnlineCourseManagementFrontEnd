import api from "../api/axiosConfig";

export const getAllCourses = async () => {
    const response = await api.get(
        "/courses/get-all-courses"
    );

    return response.data;
};

export const getCourseByName = async(courseName) => {
    const response = await api.get(`/courses/courseNameMatching?courseName=${courseName}`);
    console.log("getall returned");
    return response.data;
};

export const updateCourseByCode = async(courseCode,course) =>{

    const payload={
            courseName: course.courseName,
            instructor: course.instructor,
            price: course.price,
            duration: course.duration
    }

    const response = await api.put(`/courses/updateCourse?courseCode=${courseCode}`, payload);
    return response;
}

export const getCourseByCode = async(courseCode)=>{
    const response = await api.get(`courses/findByCourseCode?courseCode=${courseCode}`);
    return response;
}

export const deleteCourseByCode = async(courseCode) => {
    console.log(courseCode)
    const response = await api.delete(`/courses/deleteByCourseCode?courseCode=${courseCode}`);
    console.log("done delete")
    return response;
}
