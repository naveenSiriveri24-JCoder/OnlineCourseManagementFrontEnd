import { useState } from "react";
import { login } from "../Services/authService";
import "../Styles/Login.css";
function Login() {

  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const token = await login(credentials);

      console.log("JWT Token:", token);

      alert("Login successful");

      window.location.href = "/courses";

    } catch (error) {
      console.error("Login Error:", error);
      console.error("Response:", error.response);

      alert("Login failed");
}


  };

  return (
     <div className="login-container">

    <div className="login-card">

      <h2>Login</h2>

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
        <a href="/admin_login">
          Login for Admin Account?
        </a>
      </p>

    </div>
    <p className="href-signup">
      Don't have an Account? <a href="/signup">SignUp Now</a>
    </p>
  </div>
  );
}

export default Login;