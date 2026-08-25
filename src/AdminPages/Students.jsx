import React, { useEffect, useState } from 'react'
import { getAllStudents, getStudentById, deleteStudentById } from '../Services/studentService'
import "../Styles/Students.css"
//icons:
import { LiaUserEditSolid } from "react-icons/lia";
import { AiTwotoneDelete } from "react-icons/ai";

import {
    HiOutlineUser,
    HiOutlineIdentification,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineCake,
    HiOutlineCog6Tooth
} from "react-icons/hi2";

// icons
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import { MdOutlineAddAlarm } from "react-icons/md";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
  
    const getAllStudentsList = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
    try {
      
        const studentsList = await getAllStudents();
        setStudents(studentsList.data);
        } catch (error) {
        alert(error);
        } finally {
          setLoading(false);
      }
    };

  useEffect(() => {
    getAllStudentsList();
  }, []);


    if (loading) {
        return (
            <div className="s-loading-container">
                <div className="s-loader"></div>
                <h2>Loading Students Data...</h2>
            </div>
        );
    }
//getStudentById
const getStudentDetailsById = async(e) =>{
 const student = await getStudentById(e);
 setStudent(student.data);
 console.log(student);
 setShowDeletePopup(true);
}
//Delete Student
const handleDelete = async(studentId) => {
    
    try{
        await deleteStudentById(studentId);
        setShowDeletePopup(false);
        await getAllStudentsList();
        alert("Student Deleted!");
    }catch(error){
        alert(error);
    }
}

  return (
    <>
    <div className="students-container">
      <table className="students-table">
        <thead>
    <tr>
        <th>
            <div className="table-heading">
                <HiOutlineUser className="header-icon"/>
                <span>Student Name</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlineIdentification className="header-icon"/>
                <span>Student Code</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlineIdentification className="header-icon"/>
                <span>ID</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlineEnvelope className="header-icon"/>
                <span>Email</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlinePhone className="header-icon"/>
                <span>Phone</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlineCake className="header-icon"/>
                <span>Age</span>
            </div>
        </th>

        <th>
            <div className="table-heading">
                <HiOutlineCog6Tooth className="header-icon"/>
                <span>Actions</span>
            </div>
        </th>
    </tr>
</thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.userName}</td>
              <td>{student.studentCode}</td>
              <td>{student.studentId}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.age}</td>
              <td>
                <div className='action-btn'>
                    <button className='edit-btn'>
                        <LiaUserEditSolid />
                    </button>
                    <button className='delete-btn'
                    onClick={(e) =>{getStudentDetailsById(student.studentId)}}
                    >
                        <AiTwotoneDelete />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

{
        showDeletePopup && (
            <div className="st-del-popup-overlay">
                <div className="st-delete-popup">

                    <button
                        className="st-close-btn"
                        onClick={() => setShowDeletePopup(false)}
                    >
                        <IoClose />
                    </button>

                    <div className="st-delete-icon">
                        <FaTrashAlt />
                    </div>

                    <h2>Delete Student.!</h2>

                    <p>
                        Are you sure you want to delete 
                        <strong> {student.userName} </strong>?
                    </p>

                    <p className="st-warning">
                        <span>  <IoIosWarning /> This action cannot be undone.</span>
                    </p>

                    <div className="st-popup-buttons">
                        <button
                            className="st-cancel-btn"
                            onClick={() => setShowDeletePopup(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="st-delete-btn"
                            onClick={() => handleDelete(student.studentId)}
                        >
                            <FaTrashAlt />
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    </>
  )
}

export default Students;