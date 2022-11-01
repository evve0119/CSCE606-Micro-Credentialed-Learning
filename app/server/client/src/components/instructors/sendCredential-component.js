import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InstructorService from "../../services/instructor.service"
import CourseService from "../../services/course.service";

const SendCredentialComponent = (props) => {
    // If not holder go to login

    let { currentUser, setCurrentUser } = props;
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };

    // // get group_id from url
    const course_id = useParams()._id;

    // // Get user's credentials and group info
    let [currentCourse, setCurrentCourse] = useState(null)
    useEffect(() => {
        CourseService.renderCourseForm(course_id)
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
        InstructorService.sendCredential(course_id, addStudents).then(({data}) => {
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
            console.log(addStudents)
            setAddStudents([...addStudents, value]);
        }
        // Case 2  : The user unchecks the box
        else {
            console.log(addStudents)
            setAddStudents(addStudents.filter((e) => e !== value));
        }
    };


    return (
        <div style={{ padding: "3rem" }}>
            {/* If not holder */}
            {!currentUser && (
                <div>
                    <p>You don't have the permission</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        Take me to login page
                    </button>
                </div>
            )}
            {/* If holder */}
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
        </div>
    );
};

export default SendCredentialComponent;
