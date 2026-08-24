import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../Services/studentService'
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

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
  
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

  return (
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
                    <button className='delete-btn'>
                        <AiTwotoneDelete />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;