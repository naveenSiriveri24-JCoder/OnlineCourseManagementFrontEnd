import React, { useState } from 'react'
import { ValidateAdminLogin } from '../Services/authService'
import { Navigate, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        userName: "",
        password:"",
    });


 const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
        });
    };

  const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const Admin_Details = await ValidateAdminLogin(credentials);
            console.log(Admin_Details);

            const role = Admin_Details.authList.map(auth => auth.role);
             
            const hasAdminAccess =
                role.includes("ADMIN") || role.includes("SUPER_ADMIN");
                   
                if(hasAdminAccess){
                    alert("Login successful");
                    window.location.href = "/admin_dashboard";
                }else {
                        alert("You don't have permission to access the admin dashboard.");
                     }
                   
        } 
            catch(error){
                    if(error.response?.status === 403){
                    alert("UnAthorised");  
                    } else{
                        alert("UnAthorised")
                    }
                    
                }

    };

  return (
    <>
    <div className="login-container">

    <div className="login-card">

      <h2>Login to Admin Account</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder='User Name'
          type="text"
          name="userName"
          value={credentials.userName}
          onChange={handleChange}
        />

        <input
          placeholder='Password'
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

      </form>
      <p className="forgot-link">
        <a href="/forgot-password">
          Forgot Password?
        </a>
      </p>

      <p className="admin-login-link">
        <a href="/login">
          Not an Admin Go Back to Student Login?
        </a>
      </p>

    </div>
    
  </div>

    </>
  )
}

export default AdminLogin