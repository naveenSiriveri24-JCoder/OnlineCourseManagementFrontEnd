import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrollements } from '../Services/enrollmentService';
import "../Styles/Enrollments.css"

//icons
import {
  FaUserCircle,
  FaIdBadge,
  FaCalendarAlt,
  FaArrowLeft
} from "react-icons/fa";

const myEnrollments = () => {

const[enrollments, setEnrollments] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const userString = localStorage.getItem("user");
    const user = userString
    ? JSON.parse(userString)
    : null;
const userId = user.id;
console.log(userId);

const fetchEnrollments = async() =>{
    setLoading(true);

    try{
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await getEnrollements(userId);
        console.log(response);
        setEnrollments(response);
    }catch(error){
       alert("Failed to fetch courses");
    }finally {

        setLoading(false);
    }
}

useEffect(() => {
    
    fetchEnrollments();

    }, []);

const handleBack = ()=>{
    navigate("/Courses");
}

if (loading) {
    return( <div className="loading-container">
        <div className="loader"></div>
            <h2>Loading Enrollments...</h2>
            </div>);
}

return (
    <div className="enrollment-page">
        
        <div className="page-header">
            <button
            className='back-button'
            onClick={handleBack}><FaArrowLeft /></button>

            <h1>My Enrollments</h1>
            <p>View all the courses you've enrolled in.</p>
        </div>

        <div className="enrollment-container">

            {enrollments.map((enrollment) => (
                <div
                    className="enrollment-card"
                    key={enrollment.enrollmentId}
                >
                    <div className="card-header">
                        <h2>{enrollment.courseName}</h2>

                        <span
                            className={`status-badge ${
                                enrollment.status === "ACTIVE"
                                    ? "active"
                                    : "inactive"
                            }`}
                        >
                            {enrollment.status}
                        </span>
                    </div>

                    <div className="card-body">

                        <div className="info-row">
                            <span><FaIdBadge style={{ marginRight: "8px" }} /> Enrollment ID</span>
                            <strong>{enrollment.enrollmentId}</strong>
                        </div>

                        <div className="info-row">
                            <span><FaUserCircle style={{ marginRight: "8px" }} /> Student</span>
                            <strong>{enrollment.studentName}</strong>
                        </div>

                        <div className="info-row">
                            <span> <FaCalendarAlt style={{ marginRight: "8px" }} /> Enrolled On</span>
                            <strong>{enrollment.enrollmentDate}</strong>
                        </div>

                    </div>
                </div>
            ))}

        </div>
    </div>
);
}

export default myEnrollments