import React from 'react'
import "../Styles/CourseCard.css"

//icons:
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaBookmark, FaGraduationCap } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { IoCalendar } from "react-icons/io5";
import { TbReceiptRupeeFilled } from "react-icons/tb";

//getting CourseId

const CourseCard = (props) => {
  return (
    <div className='course-card'>
        <div className='card-top'>
            <p><FaGraduationCap /> {props.courseCode}</p>
            <button className='course-save-btn'>
                Save<FaBookmark />
            </button>
        </div>
        <div className='card-middle'>
            <h3>{props.courseName}</h3>
            <p><PiChalkboardTeacherFill /> {props.instructor}</p>
            <p><IoCalendar /> {props.duration} Month(s)</p>
        </div>
        <div className='card-bottom'>
            <p><TbReceiptRupeeFilled />{props.price} /-</p>
            <div className='course-btn-class'>
                <button className='course-update-btn' onClick={() => props.onUpdate(props.courseCode)}> {/* sending id to parent */}
                        <FiEdit />
                </button>
                <button className='course-delete-btn' onClick={() => props.onDelete(props.courseCode)}>
                        <AiTwotoneDelete />
                </button>
            </div>
        </div>

    </div>
  )
}

export default CourseCard