import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../Services/authService";
import "../Styles/ResetPassword.css";

const ResetPassword = () => {

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");

    const [password, setPassword] =
        useState("");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (!passwordRegex.test(password)) {

            alert(
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be 8 characters long"
            );

                return;
            }
            await resetPassword(
                token,
                password
            );

            alert(
                "Password Updated Successfully"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Password Reset Failed"
            );
        }
    };

    return (

        <div className="reset-container">

            <div className="reset-card">

                <h2>Reset Password</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button type="submit">
                        Update Password
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;