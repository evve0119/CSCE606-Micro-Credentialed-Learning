import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InstructorService from "../../services/instructor.service"
import StudentService from "../../services/student.service"

const NewTeachFormComponent = (props) => {
  const history = useHistory();

  let [message, setMessage] = useState(null);
  // Set new group name
  let [courseName, setCourseName] = useState(null);
  let [description, setDescription] = useState(null);
  let [studentEmail, setStudentEmail] = useState(null);

  // Handle new group name
  const handleChangeCourseName = (e) => {
    setCourseName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeStudentEmail = (e) => {
    setStudentEmail(e.target.value);
  };

  // Post new credential
  const postCourse = () => {
    InstructorService.createNewCourse(courseName, description, addStudentsId)
    .then(() => {
      window.alert("New course is created!")
      history.push("/instructor/home")
    }).catch((err) => {
      setMessage(err.response.data)
    });
  }

  const searchEmail = () => {
    StudentService.searchStudentbyEmail(studentEmail)
    .then(({data}) => {
      handleAddStudents(data)
    }).catch((err) => {
      setMessage(err.response.data)
    });
  }

  // Handle checked and unchecked credentials
  let [addStudentsId, setAddStudentsId] = useState([])
  let [addStudentsEmail, setAddStudentsEmail] = useState([])
  const handleAddStudents = (student) => {
    // Destructuring
    const { email , _id } = student;
    // Case 1 : The user checks the box
    setAddStudentsId([...addStudentsId, _id]);
    setAddStudentsEmail([...addStudentsEmail, email])
  };

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If not instructor*/}
      {props.currentRole && props.currentRole !== "instructor" && (
        <h1>You Are Not an Instructor</h1>
      )}
      {/* If login and instructor */}
      {props.currentRole && props.currentRole === "instructor" && (
        <div className="form-course">
          {/* Button to submit all form */}
          <h1>Add new course <button className="btn btn-primary" onClick={postCourse}>Submit</button></h1>

          <label htmlFor="courseName">Course name</label>
          <input
            name="courseName"
            type="text"
            className="form-control"
            id="courseName"
            onChange={handleChangeCourseName}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            className="form-control"
            id="description"
            onChange={handleChangeDescription}
          />
          <br />
          {/* Added students */}
          {addStudentsEmail && (addStudentsEmail.map((email, index) => (
            <div key={index} className="mb-5">
              <h3>{email}</h3>
            </div>
          )))}

          {/* Search student by email */}
          <h4 className="mt-3">Add student by email</h4>
          <input
            name="StudentEmail"
            type="text"
            className="form-control mt-3"
            id="StudentEmail"
            onChange={handleChangeStudentEmail}
          />
          <br />
          <button className="btn btn-primary" onClick={searchEmail}>Search and add</button>
          <br />
          {/* Error msg */}
          {message && (
            <div className="alert alert-warning mt-3" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewTeachFormComponent;
