import React, { useEffect, useState } from "react";
import { profileDetails } from "../Services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import { updateStudent } from "../Services/authService";
import "../Styles/Profile.css"
const Profile = () => {

  const [userProfileResp, setUserProfileResp] = useState(null);
  
  const [showModal, setShowModal] = useState(false);

  const [student, setStudent] = useState({
      id: "",
      studentCode: "",
      userName: "",
      email: "",
      phone: "",
      age: ""
  });
  
  
  const navigate = useNavigate();
  
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const profile = await profileDetails();
        console.log(profile);
        setUserProfileResp(profile);

      } catch (error) {

        console.error("Error fetching profile:", error);

      }

    };

    fetchProfile();

  }, []);

  if (!userProfileResp) {
    return (
      <div className="profile-loading">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  const backToCources = () =>{
    navigate("/courses");
  };

  const handleOpenModal = async() => {

      try {
        const profile = await profileDetails();

        setUserProfileResp(profile);

        setStudent({
        id: profile.id,
        studentCode: profile.studentCode,
        userName: profile.userName,
        email: profile.email,
        phone: profile.phone,
        age: profile.age
    });
    console.log(student);
      } catch (error) {

        console.error("Error fetching profile:", error);

      }  

    setShowModal(true);
  }

  const handleUpdate = async () => {

    try {

        const response = await updateStudent(student);

        alert("Profile updated successfully!");

        setShowModal(false);

    } catch (error) {
        if(error.response?.status === 409){
          alert(error.response?.data || "Update failed");
        }  
    }

  };

  return (
    <>
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png" alt="Online Image"></img>
          </div>

          <div className="profile-title-section">
            <h1 className="profile-title">
              User Profile
            </h1>

            <p className="profile-subtitle">
              Welcome {userProfileResp.userName}
            </p>
          </div>
           
           <div className="update-btn">
              <button onClick={handleOpenModal}>Update Details..!</button>
            </div>
            <div className="back-btn">
                <button onClick={backToCources}>
                    Back to Courses
                </button>
            </div>

        </div>

        <div className="profile-details">

          <div className="profile-item">
            <label>User ID</label>
            <p>{userProfileResp.id}</p>
          </div>
          
          <div className="profile-item">
            <label>Student Code</label>
            <p>{userProfileResp.studentCode}</p>
          </div>
          
          <div className="profile-item">
            <label>Name</label>
            <p>{userProfileResp.userName}</p>
          </div>

          <div className="profile-item">
            <label>Email</label>
            <p>{userProfileResp.email}</p>
          </div>
           
          <div className="profile-item">
            <label>Phone Number</label>
            <p>{userProfileResp.phone}</p>
          </div>
          
          <div className="profile-item">
            <label>Student Age</label>
            <p>{userProfileResp.age}</p>
          </div>

        </div>

        <div className="roles-section">

          <h3>Roles</h3>

          <div className="roles-container">

            {userProfileResp.role?.map((role) => (
              <span
                key={role.authorityId}
                className="role-badge"
              >
                {role.role}
              </span>
            ))}

          </div>

        </div>
            
      </div>

    </div>

{
showModal && (

<div className="modal-overlay">

    <div className="modal">

        <h2>Update Student Details</h2>

        <label>User ID</label>
        <input
            value={student.id}
            readOnly
        />

        <label>Student Code</label>
        <input
            value={student.studentCode}
            readOnly
        />

        <label>Name</label>
        <input
            value={student.userName}
            onChange={(e)=>
                setStudent({
                    ...student,
                    userName:e.target.value
                })
            }
        />

        <label>Email</label>
        <input
            value={student.email}
            onChange={(e)=>
                setStudent({
                    ...student,
                    email:e.target.value
                })
            }
        />

        <label>Phone Number</label>
        <input
            value={student.phone}
            onChange={(e)=>
                setStudent({
                    ...student,
                    phone:e.target.value
                })
            }
        />

        <label>Student Age</label>
        <input
            value={student.age}
            onChange={(e)=>
                setStudent({
                    ...student,
                    age:e.target.value
                })
            }
        />

        <div className="modal-buttons">

            <button onClick={handleUpdate}>
                Update
            </button>

            <button onClick={()=>setShowModal(false)}>
                Cancel
            </button>

        </div>

    </div>

</div>

)}

</>    
  );
};

export default Profile;