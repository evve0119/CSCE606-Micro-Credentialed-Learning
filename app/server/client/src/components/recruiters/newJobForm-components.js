import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";
//import StudentService from "../../services/student.service"

const NewJobFormComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    // If no current user go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };


    let [message, setMessage] = useState(null);
    // Set new group name
    let [jobName, setJobName] = useState(null);
    let [description, setDescription] = useState(null);
    //let [studentEmail, setStudentEmail] = useState(null);

    // Handle new group name
    const handleChangeJobName = (e) => {
        setJobName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    /*
    const handleChangeStudentEmail = (e) => {
        setStudentEmail(e.target.value);
    };
    */

    // Post new credential
    const postJob = () => {
        //InstructorService.createNewCourse(courseName, description, addStudentsId, currentUser.user._id).then(() => {
        RecruiterService.createNewJob(jobName, description, currentUser.user._id).then(() => {
            window.alert("New job is created!")
            history.push("/recruiter/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }

    /*
    const searchEmail = () => {
        StudentService.searchStudentbyEmail(studentEmail).
            then(({data}) => {
                handleAddStudents(data)
            }).catch((err) => {
                console.log(err)
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
    */

    return (
        <div style={{ padding: "3rem" }}>
            {/* If not login */}
            {!currentUser && (
                <div>
                    <p>You must login before seeing your courses.</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        Take me to login page
                    </button>
                </div>
            )}
            {/* If not student */}
            {(currentUser.user.role != "recruiter") && (
                <div>
                    <p>You are not authorized</p>
                </div>
            )}
            {/* If login and student */}
            {currentUser && (currentUser.user.role == "recruiter") && (
                <div className="form-course">
                    {/* Button to submit all form */}
                    <h1>Add new job <button className="btn btn-primary" onClick={postJob}>Submit</button></h1>

                    <label htmlFor="jobName">Job name</label>
                    <input
                        name="jobName"
                        type="text"
                        className="form-control"
                        id="jobName"
                        onChange={handleChangeJobName}
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

export default NewJobFormComponent;
