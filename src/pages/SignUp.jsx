import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../Services/authService";
import "../Styles/SignUp.css";
const Signup = () => {

  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const [student, setStudent] = useState({
    userName: "",
    password: "",
    email: "",
    phone: "",
    age: "",
    authorities: []
  });

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const handleRoleChange = (e) => {

    const role = e.target.value;

    if (e.target.checked) {

      setStudent({
        ...student,
        authorities: [
          ...student.authorities,
          { role }
        ]
      });

    } else {

      setStudent({
        ...student,
        authorities: student.authorities.filter(
          auth => auth.role !== role
        )
      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...student,
        age: Number(student.age)
      };

      console.log("Request Payload:", payload);
      
      if (!passwordRegex.test(student.password)) {

          alert(
              "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be 8 characters long"
          );

          return;
      }
      await signup(payload);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="signup-container">

      <div className="signup-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={student.userName}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={student.password}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={student.phone}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={student.age}
            onChange={handleChange}
            required
          />

          <div className="roles-section">

            <h4>Select Roles</h4>

            <label>
              <input
                type="checkbox"
                value="ADMIN"
                onChange={handleRoleChange}
              />
              ADMIN
            </label>

            <br />

            <label>
              <input
                type="checkbox"
                value="SUPER_ADMIN"
                onChange={handleRoleChange}
              />
              SUPER_ADMIN
            </label>
            <label>
              <input
                type="checkbox"
                value="USER"
                onChange={handleRoleChange}
              />
              USER
            </label>

          </div>

          <button type="submit">
            Sign Up
          </button>

        </form>

      </div>
        <p className="href-login">
            Already a Valied User? <a href="/login">Login Now</a>
        </p>
    </div>

  );

};

export default Signup;