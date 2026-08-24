import React, { useEffect, useState } from 'react'
import { getAllEnrollments, deleteEnrollment, getEnrollmentById, extendEnrollmentDuration } from '../Services/enrollmentService'
import EnrollmentCard from '../Components/EnrollmentCard';
import "../Styles/AdminEnrollment.css"
// icons
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineAddAlarm } from "react-icons/md";

const Enrollments = () => {
const [enrollments, setEnrollments] = useState([]);
const [loading, setLoading] = useState(true);
const [showDeletePopup, setShowDeletePopup] = useState(false);
const [showExtendPopup, setShowExtendPopup] = useState(false);
const [enrollmentId, setEnrollmentId] = useState();
const [enrollment, setEnrollment] = useState([]);
const [selectedCourseCode, setSelectedCourseCode] = useState("");
const [enrollmentDuration, setEnrollmentDuration] = useState("");
//Get All Enrollments
const getEnrollments = async()=>{
  try{
      const response = await getAllEnrollments();
      setEnrollments(response.data);
      setLoading(false);
  } catch(error){
    alert(error);
  }
 
}

console.log(enrollments);

useEffect(()=>{
  getEnrollments();
},[]);

// Delete enrollment
const handleDelete = async(id)=>{
  try{
  const response = await getEnrollmentById(id);
    setEnrollment(response.data);
    setEnrollmentId(id);
    setShowDeletePopup(true);
    }catch(error){
      console.log(error)
      alert("Errr "+error);
    }
}

const deleteCourse = async(enrollmentId) => {
    try{
        await deleteEnrollment(enrollmentId);
        setShowDeletePopup(false);
        alert("Enrollment deleted successfully");
        await getEnrollments();
    }catch(error){
        alert(error);
    }
}
// extending enrollment duration

const handleExtend = async (e) =>{
    try{
    const response = await getEnrollmentById(e);
    setEnrollment(response.data);
    setEnrollmentDuration("");
    setShowExtendPopup(true);
    } catch(error){
        alert(error);
    }
}
const updateDuration = async () =>{
   
    if (!enrollmentDuration || Number(enrollmentDuration) < 1) {
        alert("Please enter a valid duration.");
        return;
    }

    try{
    await extendEnrollmentDuration(enrollmentDuration, enrollment );
    await getEnrollments();
    setShowExtendPopup(false);
    setEnrollmentDuration("");
    }catch(error){
        alert(error);
    }
}
const closeExtendPopup = () => {
    setShowExtendPopup(false);
    setEnrollmentDuration("");
};
  return (
    <>
    <div className='enr-parent'>
      {loading
        ? Array.from({ length: 16 }).map((_, i) => (
            <div className="enr-course-card enr-skeleton-card" key={i}>
                <div className="enr-skeleton title"></div>
                <div className="enr-skeleton text"></div>
                <div className="enr-skeleton text"></div>
                <div className="enr-skeleton button"></div>
            </div>
      )) 
      :enrollments.map((enrollment)=>(
        <EnrollmentCard
          key = {enrollment.enrollmentId}
          enrollmentId={enrollment.enrollmentId}
          courseCode = {enrollment.courseCode}
          studentCode = {enrollment.studentCode}
          studentName = {enrollment.studentName}
          courseName = {enrollment.courseName}
          enrollmentDate = {enrollment.enrollmentDate}
          enrollmentDuration = {enrollment.enrollmentDuration}
          status = {enrollment.status}
          onDelete = {handleDelete}
          onExtend = {handleExtend}
        />
      ))}
    </div>

    {
        showDeletePopup && (
            <div className="enr-popup-overlay">
                <div className="enr-delete-popup">

                    <button
                        className="enr-close-btn"
                        onClick={() => setShowDeletePopup(false)}
                    >
                        <IoClose />
                    </button>

                    <div className="enr-delete-icon">
                        <FaTrashAlt />
                    </div>

                    <h2>Delete Enrollment!</h2>

                    <p>
                        Are you sure you want to delete 
                        <strong> {enrollment.courseName} <span>for</span> {enrollment.studentName}</strong>?
                    </p>

                    <p className="enr-warning">
                        <span>  <IoIosWarning /> This action cannot be undone.</span>
                    </p>

                    <div className="enr-popup-buttons">
                        <button
                            className="enr-cancel-btn"
                            onClick={() => setShowDeletePopup(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="enr-delete-btn"
                            onClick={() => deleteCourse(enrollmentId)}
                        >
                            <FaTrashAlt />
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        )
    }


    {
        showExtendPopup && (
            <div className="enr-ext-popup-overlay">
                <div className="enr-ext-popup">

                    <button
                        className="enr-ext-close-btn"
                        onClick={closeExtendPopup}
                    >
                        <IoClose />
                    </button>

                    <div className="enr-ext-extend-icon">
                        <MdOutlineAddAlarm />
                    </div>

                    <h2>Update Enrollment Duration!</h2>

                    <p>
                        Are you sure you want to upadate Duration of
                        <strong> {enrollment.courseName} <span>for</span> {enrollment.studentName} <span>?</span></strong>
                    </p>
                    <div className='enr-ext-input-parent'>
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter duration (months)"
                        value={enrollmentDuration}
                        onChange={(e) => setEnrollmentDuration(e.target.value)}
                        className="enr-ext-input"
                    />
                    </div>
                    <div className="enr-ext-popup-buttons">
                        <button
                            className="enr-ext-cancel-btn"
                            onClick={closeExtendPopup}
                        >
                            Cancel
                        </button>

                        <button
                            className="enr-ext-extend-btn"
                            onClick={() => updateDuration(enrollmentId)}
                        >
                        <div className="enr-ext-extend-icon-btn">
                            <MdOutlineAddAlarm />
                        </div>
                            Extend
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    </>
  )
}

export default Enrollments