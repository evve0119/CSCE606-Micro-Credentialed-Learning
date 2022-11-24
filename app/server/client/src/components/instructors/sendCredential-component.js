import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InstructorService from "../../services/instructor.service"

const SendCredentialComponent = (props) => {
    const history = useHistory();
    // // get group_id from url
    const courseId = useParams().courseId;

    // // Get user's credentials and group info
    let [currentCourse, setCurrentCourse] = useState(null)
    useEffect(() => {
        InstructorService.renderSendCredentialForm(courseId)
            .then(({ data }) => {
                setCurrentCourse(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [message, setMessage] = useState(null);

    // Send Credential
    const sendCredential = () => {
        InstructorService.sendCredential(courseId, addStudents).then(({data}) => {
            window.alert(data);
            history.push("/instructor/home");
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }
    // // Handle checked and unchecked credentials
    let [addStudents, setAddStudents] = useState([])
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        // Case 1 : The user checks the box
        if (checked) {
            setAddStudents([...addStudents, value]);
        }
        // Case 2  : The user unchecks the box
        else {
            setAddStudents(addStudents.filter((e) => e !== value));
        }
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
                <>
                {currentCourse && (
                    <div className="form-group">
                        <h1>Send Credential of {currentCourse.name}</h1>
                        <br />
                        {/* All credentials */}

                        {currentCourse && (currentCourse.students.map((student) => (
                            <div key={student._id} className="mb-5">
                                    <div>
                                        <input className="h3" type="checkbox" name="studentEmail" value={student._id} onChange={handleChange} />
                                        <label className="h3" htmlFor={student._id}>{student.email}</label>
                                    </div>
                            </div>
                        )))}
                        <button className="btn btn-primary" onClick={sendCredential}>Submit</button>
                        <br />
                        {message && (
                            <div className="alert alert-warning mt-3" role="alert">
                                {message}
                            </div>
                        )}
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default SendCredentialComponent;
