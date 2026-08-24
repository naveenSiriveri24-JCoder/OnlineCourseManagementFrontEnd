import React from 'react'
import "../Styles/EnrollmentCard.css"
//icons:
import { FaGraduationCap, FaUser, FaIdBadge, FaCalendarCheck  } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { MdOutlineAddAlarm } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
const EnrollmentCard = (props) => {
  return (
    <>
    <div className='enr-enrollmentCard'>
      <div className='enr-top'>
        <p><FaGraduationCap /> {props.courseCode}</p>
        <p>{props.status}</p>
      </div>
      <div className='enr-middle'>
        <h3>{props.courseName}</h3>
        <div className='enr-middle-sub'>
          <p><FaUser /> {props.studentName}</p>
          <p><FaIdBadge /> {props.studentCode}</p>
        </div>
      </div>
      <div className='enr-bottom'>
        <p><FaCalendarCheck /> {props.enrollmentDate}</p>
      </div>
      <div className='enr-lower'>
         <p><GiDuration/> {props.enrollmentDuration} Month(s)</p>
         <div className='enr-lower-btn'>
              <button onClick={() => props.onExtend(props.enrollmentId)}>
                <MdOutlineAddAlarm /> Extend
              </button>
              <button onClick={() => props.onDelete(props.enrollmentId)}>
                <RiDeleteBin6Fill />
              </button>
         </div>
      </div>
    </div>
    </>
  )
}

export default EnrollmentCard