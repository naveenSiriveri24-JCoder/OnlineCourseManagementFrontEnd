import React, { useEffect, useState } from 'react'
import {
    getAllStudents,
    getStudentById,
    deleteStudentById
} from '../Services/studentService'

import "../Styles/Students.css"

// Icons
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

import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";


const Students = () => {

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [loading, setLoading] = useState(true);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);


    // Get Students
    const getAllStudentsList = async () => {

        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        try {

            const studentsList = await getAllStudents(pageNumber, size);

            setStudents(studentsList.data.content);
            setTotalPages(studentsList.data.totalPages);
            setTotalElements(studentsList.data.totalElements);

        } catch (error) {

            alert(error);

        } finally {

            setLoading(false);

        }
    };


    // Pagination API call
    useEffect(() => {

        getAllStudentsList();

    }, [pageNumber, size]);


    // Loading Screen
    if (loading) {

        return (
            <div className="s-loading-container">

                <div className="s-loader"></div>

                <h2>
                    Loading Students Data...
                </h2>

            </div>
        );
    }


    // Get Student By ID
    const getStudentDetailsById = async (studentId) => {

        try {

            const studentResponse = await getStudentById(studentId);

            setStudent(studentResponse.data);

            console.log(studentResponse);

            setShowDeletePopup(true);

        } catch (error) {

            alert("Unable to get student details.");

        }
    };


    // Delete Student
    const handleDelete = async (studentId) => {

        try {

            await deleteStudentById(studentId);

            setShowDeletePopup(false);

            /*
             * If deleting the last student on a page,
             * move to previous page if necessary.
             */
            if (
                students.length === 1 &&
                pageNumber > 0
            ) {

                setPageNumber(pageNumber - 1);

            } else {

                await getAllStudentsList();

            }

            alert("Student Deleted!");

        } catch (error) {

            if (error.response?.status === 409) {

                alert(error.response.data.message);

            } else {

                alert("Something went wrong. Please try again.");

            }
        }
    };


    return (

        <>

            <div className="students-container">


                {/* =========================
                    TABLE SCROLL AREA
                ========================= */}

                <div className="table-wrapper">

                    <table className="students-table">

                        <thead>

                            <tr>

                                <th>
                                    <div className="table-heading">
                                        <HiOutlineUser className="header-icon" />
                                        <span>Student Name</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlineIdentification className="header-icon" />
                                        <span>Student Code</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlineIdentification className="header-icon" />
                                        <span>ID</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlineEnvelope className="header-icon" />
                                        <span>Email</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlinePhone className="header-icon" />
                                        <span>Phone</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlineCake className="header-icon" />
                                        <span>Age</span>
                                    </div>
                                </th>


                                <th>
                                    <div className="table-heading">
                                        <HiOutlineCog6Tooth className="header-icon" />
                                        <span>Actions</span>
                                    </div>
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {students.map((student) => (

                                <tr key={student.studentId}>

                                    <td>
                                        {student.userName}
                                    </td>

                                    <td>
                                        {student.studentCode}
                                    </td>

                                    <td>
                                        {student.studentId}
                                    </td>

                                    <td>
                                        {student.email}
                                    </td>

                                    <td>
                                        {student.phone}
                                    </td>

                                    <td>
                                        {student.age}
                                    </td>


                                    <td>

                                        <div className="action-btn">

                                            <button
                                                className="edit-btn"
                                            >
                                                <LiaUserEditSolid />
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    getStudentDetailsById(
                                                        student.studentId
                                                    )
                                                }
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


                {/* =========================
                    PAGINATION
                ========================= */}

                <div className="pagination-container">


                    {/* Pagination Information */}

                    <div className="pagination-info">

                        Showing{" "}

                        {totalElements === 0
                            ? 0
                            : pageNumber * size + 1
                        }

                        {" - "}

                        {Math.min(
                            (pageNumber + 1) * size,
                            totalElements
                        )}

                        {" of "}

                        {totalElements}

                        {" "}students

                    </div>


                    {/* Pagination Controls */}

                    <div className="pagination-controls">


                        {/* Previous */}

                        <button
                            className="pagination-btn"
                            disabled={pageNumber === 0}
                            onClick={() =>
                                setPageNumber(pageNumber - 1)
                            }
                        >
                            ‹
                        </button>


                        {/* Page Numbers */}

                        {Array.from(
                            { length: totalPages },
                            (_, index) => (

                                <button
                                    key={index}
                                    className={`pagination-number ${
                                        pageNumber === index
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setPageNumber(index)
                                    }
                                >
                                    {index + 1}
                                </button>

                            )
                        )}


                        {/* Next */}

                        <button
                            className="pagination-btn"
                            disabled={
                                totalPages === 0 ||
                                pageNumber === totalPages - 1
                            }
                            onClick={() =>
                                setPageNumber(pageNumber + 1)
                            }
                        >
                            ›
                        </button>

                    </div>


                    {/* Page Size */}

                    <div className="page-size">

                        <span>
                            Rows:
                        </span>


                        <select
                            value={size}
                            onChange={(e) => {

                                setSize(
                                    Number(e.target.value)
                                );

                                setPageNumber(0);

                            }}
                        >

                            <option value={5}>
                                5
                            </option>

                            <option value={10}>
                                10
                            </option>

                            <option value={20}>
                                20
                            </option>

                            <option value={50}>
                                50
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* =========================
                DELETE POPUP
            ========================= */}

            {showDeletePopup && (

                <div className="st-del-popup-overlay">

                    <div className="st-delete-popup">


                        {/* Close */}

                        <button
                            className="st-close-btn"
                            onClick={() =>
                                setShowDeletePopup(false)
                            }
                        >
                            <IoClose />
                        </button>


                        {/* Delete Icon */}

                        <div className="st-delete-icon">

                            <FaTrashAlt />

                        </div>


                        <h2>
                            Delete Student.!
                        </h2>


                        <p>

                            Are you sure you want to delete

                            <strong>
                                {" "}
                                {student.userName}
                                {" "}
                            </strong>

                            ?

                        </p>


                        {/* Warning */}

                        <p className="st-warning">

                            <span>

                                <IoIosWarning />

                                This action cannot be undone.

                            </span>

                        </p>


                        {/* Popup Buttons */}

                        <div className="st-popup-buttons">


                            <button
                                className="st-cancel-btn"
                                onClick={() =>
                                    setShowDeletePopup(false)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="st-delete-btn"
                                onClick={() =>
                                    handleDelete(
                                        student.studentId
                                    )
                                }
                            >

                                <FaTrashAlt />

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

};

export default Students;