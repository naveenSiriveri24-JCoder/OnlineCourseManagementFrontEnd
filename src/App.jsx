import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Courses from "./pages/Courses";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyEnrollments from "./pages/MyEnrollments";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./AdminPages/Dashboard";
import SessionExpire from "./pages/SessionExpire";
function App() {

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />
                <Route
                        path="/courses"
                        element={<Courses />}
                    />
                <Route
                    path="/courses"
                    element={
                        <PrivateRoute>
                            <Courses />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/profileDetails" 
                    element={<Profile />} 
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />
                <Route 
                    path="/Enrollments_me"
                    element={<MyEnrollments/>}
                />
                <Route 
                    path="/admin_login"
                    element={<AdminLogin/>}
                />
                <Route 
                    path="/admin_dashboard/*"
                    element={<Dashboard/>}
                />
                <Route 
                    path="/session_expire"
                    element={<SessionExpire/>}
                />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;