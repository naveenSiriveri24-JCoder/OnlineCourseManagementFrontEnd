import React, { useState } from "react";
import { forgotPassword } from "../Services/authService";
import "../Styles/ForgotPassword.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await forgotPassword(email);

            alert(
                "Password reset link sent to your email"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Unable to send reset link"
            );
        }
    };

    return (

        <div className="forgot-container">

            <div className="forgot-card">

                <h2>Forgot Password</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <button type="submit">
                        Send Reset Link
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ForgotPassword;