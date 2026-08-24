import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../Services/courseService";
import { getCourseByName } from "../Services/courseService";
import { enrollCourse } from "../Services/enrollmentService";
import "../Styles/Courses.css";

//icons
import { FaSearch } from "react-icons/fa";
function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();
    const userString = localStorage.getItem("user");
    console.log(userString);

    const user = userString
    ? JSON.parse(userString)
    : null;

const fetchCourses = async () => {
    
    try {

        let data;

        if (searchText.trim() === "") {
            
            data = await getAllCourses();
            
        }else{
            
             data = await getCourseByName(searchText)
        } 

        setCourses(data);

    } catch (error) {

        console.error(error);
        alert("Failed to fetch courses");

    } finally {

        setLoading(false);
    }
};

const fetchAllCourses = async () => {

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {

        const data = await getAllCourses();
        setCourses(data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }
};

    useEffect(() => {
    
        if(searchText.trim() === ""){
            fetchAllCourses();
            return;
        } 
    
        fetchCourses();
    }, [searchText]);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const handleInfo = () =>{
        navigate("/profileDetails");
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <h2>Loading Courses...</h2>
            </div>
        );
    }

    const handleChange = async (e)=>{
        const value = e.target.value;
        setSearchText(value);
    }

    const handleEnrollments = () =>{
        navigate("/Enrollments_me");
    }

    const handleEnroll = async (courseId) =>{
        try {

        await enrollCourse(courseId);
            alert("Course enrolled successfully!");
        navigate("/Enrollments_me");

        } catch (error) {
            if (error.response?.status === 409) {
            alert(error.response.data.message);
        } else {
            alert("Something went wrong. Please try again.");
        }

        console.error(error);

        }
    }
    return (
        <>
            <div className="navbar">

                <h2>Course Management</h2>
                
                <button className="enrollment-me"
                    onClick={handleEnrollments}>
                    My Enrollmens
                </button>
                
                <div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                    <button
                        className="profile-info"
                        onClick={handleInfo}
                    >
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png" alt="Online Image"></img>  
                    </button>
                </div>

            </div>
                <div className="course-searchBar">
                    <FaSearch className="search-icon" />
                    <input 
                    
                        placeholder="Search By Course Name...."
                        value={searchText}
                        onChange={handleChange}
                    />
                </div>
            <div className="courses-container">


                

                <div className="card-container">

                    {courses.map(course => (

                        <div
                            key={course.courseId}
                            className="course-card"
                        >

                            <h2>
                                {course.courseName}
                            </h2>

                            <p>
                                <strong>Course Code:</strong>
                                {" "}
                                {course.courseCode}
                            </p>

                            <p>
                                <strong>Instructor:</strong>
                                {" "}
                                {course.instructor}
                            </p>

                            <p className="course-price">
                                 <strong>Price: ₹</strong>
                                {" "}
                                {course.price}
                            </p>

                            <p className="course-duration">
                                Duration:
                                {" "}
                                {course.duration}
                                {" "}
                                Month(s)
                            </p>
                            <div className="btn-class">
                                <button onClick={() => handleEnroll(course.courseId)}>Enroll Now</button>
                                <button>Add to Cart</button>
                            </div>
                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

export default Courses;