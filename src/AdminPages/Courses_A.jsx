import React, { useEffect, useState } from 'react'
import { getAllCourses, getCourseByName, updateCourseByCode, getCourseByCode, deleteCourseByCode } from '../Services/courseService'
import CourseCard from '../Components/CourseCard';
import "../Styles/CourseCard.css"

//icon
import { FaSearch } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";

const Courses_A = () => {
  
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [course, setCourse] = useState({
      courseName: "",
      instructor: "",
      price: "",
      duration: ""
  });

  const fetchCourses = async () => {
    
    try {

        let data;

        if (searchText.trim() === "") {
            
            data = await getAllCourses();
            
        }else{
            
             data = await getCourseByName(searchText)
        } 

        setCourses(data);

    } catch (error) {

        console.error(error);
        alert("Failed to fetch courses");

    } finally {

        setLoading(false);
    }
  };

  const fetchAllCourses = async () => {

      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      try {

          const data = await getAllCourses();
          setCourses(data);

      } catch (error) {

          console.error(error);

      } finally {

          setLoading(false);

      }
  };

  useEffect(() => {
    
        if(searchText.trim() === ""){
            fetchAllCourses();
            return;
        } 
    
        fetchCourses();
  }, [searchText]);

  const handleChange = async (e)=>{
        const value = e.target.value;
        setSearchText(value);
  }
  //Update section
  const updateCourse = async () => {
      try {

          await updateCourseByCode(selectedCourseCode, course);

          alert("Course Updated Successfully");
          fetchAllCourses();
          setShowPopup(false);

          fetchCourses();

      } catch (error) {
          console.log(error);
      }
  };
  //To open Pop- and get data in feilds
  const handleUpdate = async (courseCode) => {
    try {
        setSelectedCourseCode(courseCode);
        const response = await getCourseByCode(courseCode);

        setCourse(response.data);

        setShowPopup(true);

    } catch (error) {
        console.log(error);
    }
};

  //Delete 
  const handleDelete = async(courseCode)=>{
    setSelectedCourseCode(courseCode);
    const response = await getCourseByCode(courseCode);
    setCourse(response.data);
    setshowDeletePopup(true);
  }

  const deleteCourse = async (courseCode) =>{   
    console.log(courseCode);
    try{     
        await deleteCourseByCode(courseCode);
       
       fetchCourses();
       setshowDeletePopup(false)

    } catch(error){
      alert(error);
    }
  }

  return (
    <>
    <div className="s-course-searchBar">
        <FaSearch className="s-search-icon" />
        <input 
        
            placeholder="Search By Course Name...."
            value={searchText}
            onChange={handleChange}
        />
    </div>
    <div className='course-parent'>
      {loading
        ? Array.from({ length: 16 }).map((_, i) => (
            <div className="course-card skeleton-card" key={i}>
                <div className="skeleton title"></div>
                <div className="skeleton text"></div>
                <div className="skeleton text"></div>
                <div className="skeleton button"></div>
            </div>
      ))
      :courses.map((course) => (
        <CourseCard 
          key = {course.courseId}
          courseId = {course.courseId}
          onUpdate={handleUpdate} //used bring back value from child
          onDelete={handleDelete}
          courseCode = {course.courseCode}
          courseName = {course.courseName}
          instructor = {course.instructor}
          duration = {course.duration}
          price ={course.price}
        />
      ))}
    </div>
    {showPopup && (
      <div className="popup-overlay">

          <div className="popup">

              <h2>Update Course</h2>
              <div className="input-group">
              <input
                  type="text"
                  placeholder=" "
                  readOnly
                  value={course.courseCode} 
                
              />
              <label> Course Code </label>
              </div>

              <div className="input-group">
              <input
                  type="text"
                  placeholder=" "
                  value={course.courseName}
                  onChange={(e)=>
                      setCourse({
                          ...course,
                          courseName:e.target.value
                      })
                  }
                  required
              />
              <label>Course Name</label>
              </div>
              <div className="input-group">
              <input
                  type="text"
                  placeholder=" "
                  value={course.instructor}
                  onChange={(e)=>
                      setCourse({
                          ...course,
                          instructor:e.target.value
                      })
                  }
              />
              <label>Instructor</label>
              </div>
              <div className="input-group">
              <input
                  type="number"
                  placeholder=" "
                  value={course.price}
                  onChange={(e)=>
                      setCourse({
                          ...course,
                          price:e.target.value
                      })
                  }
              />
              <label>Price</label>
              </div>
              <div className="input-group">
              <input
                  type="number"
                  placeholder=" "
                  value={course.duration}
                  onChange={(e)=>
                      setCourse({
                          ...course,
                          duration:e.target.value
                      })
                  }
              />
              <label>Duration(m)</label>
              </div>
              <div className="popup-buttons">

                  <button onClick={updateCourse}>
                      Update
                  </button>

                  <button onClick={() => setShowPopup(false)}>
                      Cancel
                  </button>

              </div>

          </div>

      </div>
      )}

            {
                showDeletePopup && (
                    <div className="cs-popup-overlay">
                        <div className="cs-delete-popup">

                            <button
                                className="cs-close-btn"
                                onClick={() => setshowDeletePopup(false)}
                            >
                                <IoClose />
                            </button>

                            <div className="cs-delete-icon">
                                <FaTrashAlt />
                            </div>

                            <h2>Delete Course !</h2>

                            <p>
                                Are you sure you want to delete
                                <strong> {course.courseName}</strong>?
                            </p>

                            <p className="cs-warning">
                               <IoIosWarning /> <span>This action cannot be undone.</span>
                            </p>

                            <div className="cs-popup-buttons">
                                <button
                                    className="cs-cancel-btn"
                                    onClick={() => setshowDeletePopup(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="cs-delete-btn"
                                    onClick={() => deleteCourse(selectedCourseCode)}
                                >
                                    <FaTrashAlt />
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
    </>
  )
}

export default Courses_A