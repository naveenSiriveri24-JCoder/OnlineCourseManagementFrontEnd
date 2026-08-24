import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SessionExpire.css";

//icons
import { RxLapTimer } from "react-icons/rx";

const SessionExpire = () => {
  
    const navigate = useNavigate();

  useEffect(() => {
            const timer = setTimeout(() => {
            navigate("/login");
            }, 5000);

            return () => clearTimeout(timer);
    }, [navigate]);

  return (
    <div className="session-container">
      
      <div className="session-gif">
        <RxLapTimer />
      </div>


      <h1>Session Expired</h1>

      <p>
        Your session has expired for security reasons.
        <br />
        Please log in again to continue.
      </p>

      <button
        className="s-login-btn"
        onClick={() => navigate("/login")}
      >
        Login Again
      </button>

      <span className="redirect-text">
        Redirecting to login in 5 seconds...
      </span>
    </div>
  );
};

export default SessionExpire