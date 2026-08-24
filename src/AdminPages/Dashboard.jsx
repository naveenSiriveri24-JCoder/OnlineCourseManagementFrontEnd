import React from 'react'
import Students from '../AdminPages/Students'
import Courses_A from '../AdminPages/Courses_A'
import Enrollments from '../AdminPages/Enrollments'
import AdminProfile from '../AdminPages/AdminProfile'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../Styles/AdminDashboard.css";

//icons:
import { PiStudentDuotone, PiBookOpenTextLight } from "react-icons/pi";
import { GiBookPile } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaIdBadge } from "react-icons/fa";

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/admin_login");
    };

return (
    <div>
        <nav className="nav">
            <div className="nav-center">
                <NavLink
                    to="/admin_dashboard"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <PiStudentDuotone className="nav-icon"  /> 
                    <span>Students</span>
                </NavLink>

                <NavLink
                    to="/admin_dashboard/Courses_A"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                <PiBookOpenTextLight className="nav-icon"  /> 
                    <span>Courses</span>
                </NavLink>

                <NavLink
                    to="/admin_dashboard/Enrollments"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <GiBookPile className="nav-icon"  />
                    <span>Enrollments</span>
                </NavLink>
            </div>
            <div className="nav-right">
                <button
                    className="profile-btn"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FaUserCircle className="nav-icon-profile" />
                </button>

                {showMenu && (
                    <div className="profile-dropdown">
                        <NavLink
                            to="/admin_dashboard/AdminProfile"
                            onClick={() => setShowMenu(false)}
                        >
                            <FaIdBadge className='nav-icon' />My Profile
                        </NavLink>

                        <button className='admin-logout-btn' onClick={handleLogout}>
                           <RiLogoutCircleLine className='nav-icon'/> Logout
                        </button>
                    </div>
                )}
            </div>
            
        </nav>

        <Routes>
            <Route index element={<Students />} />
            <Route path="/Courses_A" element={<Courses_A/>}/>
            <Route path="/Enrollments" element={<Enrollments/>}/>
            <Route path="/AdminProfile" element={<AdminProfile/>}/>
        </Routes>
    </div>
  )
}

export default Dashboard