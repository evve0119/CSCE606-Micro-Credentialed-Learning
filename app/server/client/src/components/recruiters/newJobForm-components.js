import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";

const NewJobFormComponent = (props) => {
    const history = useHistory();

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
        RecruiterService.createNewJob(jobName, description).then(() => {
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
            {/* If not login*/}
            {!props.currentRole && (
                <h1>Please Login</h1>
            )}
            {/* If not recruiter*/}
            {props.currentRole && props.currentRole !== "recruiter" && (
                <h1>You Are Not a Recruiter</h1>
            )}
            {/* If login and recruiter */}
            {props.currentRole && props.currentRole === "recruiter" && (
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
