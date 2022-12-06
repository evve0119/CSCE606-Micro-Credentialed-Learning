import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InstructorService from "../../services/instructor.service";
import StudentService from "../../services/student.service";
import {Modal, Form, Button} from "react-bootstrap";

const CourseForm = (props) => {
    return(
      <Form.Group className="mb-3" controlId={props.name}>
        <Form.Label>{props.name}</Form.Label>
        <Form.Control
          type={props.name}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
      </Form.Group>
    );
  };

const CourseFormComponent = (props) => {
    const courseId = useParams().courseId;
    const history = useHistory();

    let [message, setMessage] = useState(null);
    let [currentCourse, setCurrentCourse] = useState(null);
    let [newCourseName, setNewCourseName] = useState("");
    let [newCourseDescription, setNewCourseDescription] = useState("");
    let [editStudents, setEditStudents] = useState([]);
    let [searchedStudentEmail, setSearchedStudentEmail] = useState(null);
    let [addStudentsId, setAddStudentsId] = useState([])
    let [addStudentsEmail, setAddStudentsEmail] = useState([])

    useEffect(() => {
        InstructorService.renderCourseForm(courseId)
            .then(({ data }) => {
                setCurrentCourse(data);
                let studentsId = []
                data.students.map((student) => {
                    studentsId = [...studentsId, student._id]
                })
                setEditStudents(studentsId);
                setNewCourseName(data.name)
                setNewCourseDescription(data.description)
            })
            .catch((err) => {
                setMessage(err.response.data);

            });
    }, []);

    // Handle new course name
    const handleChangeCourseName = (e) => {
        setNewCourseName(e.target.value);
    };

    const handleClose = e => {
        history.push("/instructor/home");
    };

    // Handel new course description
    const handleChangeCourseDescription = (e) => {
        setNewCourseDescription(e.target.value)
    };

    const handleChangeSearchedStudentEmail = (e) => {
        setSearchedStudentEmail(e.target.value);
    };

    // Handle checked and unchecked students
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        // Case 1 : The user checks the box
        if (checked) {
            setEditStudents([...editStudents, value]);
        }
        // Case 2  : The user unchecks the box
        else {
            setEditStudents(editStudents.filter((e) => e !== value));
        }
    };

    // Search student by email and add
    const searchEmail = () => {
        StudentService.searchStudentbyEmail(searchedStudentEmail).
            then(({ data }) => {
                handleAddStudents(data)
            }).catch((err) => {
                setMessage(err.response.data)
            });
    };
    const handleAddStudents = (student) => {
        const { email, _id } = student;
        if (!editStudents.includes(_id)) {
            setEditStudents([...editStudents, _id]);
            setAddStudentsId([...addStudentsId, _id]);
            setAddStudentsEmail([...addStudentsEmail, email])
        }
        else {
            setMessage("This student is already on the list")
        }

    };

    // Update course
    const updateCourse = () => {
        InstructorService.updateCourse(currentCourse._id, newCourseName, newCourseDescription, editStudents)
        .then(() => {
            window.alert("Course is updated!");
            history.push("/instructor/home");
        }).catch((err) => {
            setMessage(err.response.data);
        });
    };

    // Delete course
    const deleteCourse = () => {
        InstructorService.deleteCourse(courseId)
        .then(()=>{
            window.alert("Course is deleted!");
            history.push("/instructor/home");
        }).catch((err)=>{
            setMessage(err.response.data);
        });
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
                    <div>
                        <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit {currentCourse.name} </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <CourseForm
                                        name={"Course name"}
                                        defaultValue={newCourseName}
                                        onChange={handleChangeCourseName}
                                    />

                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3}
                                            defaultValue={newCourseDescription}
                                            onChange={handleChangeCourseDescription}
                                        />
                                    </Form.Group>

                                    <p>Enrolled students</p>
                                    {currentCourse.students && (currentCourse.students.map((student) => (
                                            <div>
                                                <input className="h5" type="checkbox" name="students" value={student._id} onChange={handleChange} defaultChecked />
                                                <label className="p" htmlFor={student._id}>&emsp;{student.email}</label>
                                            </div>
                                        )))}
                                    <br />



                                    <CourseForm
                                        name={"Add student by email"}
                                        defaultValue={searchedStudentEmail}
                                        onChange={handleChangeSearchedStudentEmail}
                                    />

                                    <Button variant="warning" onClick={searchEmail}>
                                    Search and add
                                    </Button>
                                    <br />
                                    <br />

                                    {/* Added students */}
                                    {addStudentsEmail.length >=1  && <p>New added student:</p>}
                                    {addStudentsEmail && (addStudentsEmail.map((email, index) => (

                                    <ul key={index} className="mb-1">
                                        <h6>{email}</h6>
                                    </ul>
                                    )))}

                                </Form>


                                {message && (
                                    <div className="alert alert-warning mt-3" role="alert">
                                        {message}
                                    </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={deleteCourse}>
                                    Delete
                                </Button>
                                <Button variant="primary" onClick={updateCourse}>
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default CourseFormComponent;
// {/* <div
//                         className="form-group"
//                         style={{
//                             position: "absolute",
//                             background: "#fff",
//                             top: "10%",
//                             left: "10%",
//                             right: "10%",
//                             padding: 15,
//                             border: "2px solid #444"
//                         }}
//                     >
//                         {/* Course name */}
//                         <h1>Edit {currentCourse.name}</h1>
//                         <br />
//                         <label className="h5" htmlFor="courseName">Name</label>
//                         <input
//                             name="courseName"
//                             type="text"
//                             className="form-control mt-2"
//                             id="courseName"
//                             defaultValue={currentCourse.name}
//                             onChange={handleChangeCourseName}
//                         />
//                         <br />

//                         {/* Course description */}
//                         <label className="h5" htmlFor="courseDescription">Description</label>
//                         <input
//                             name="courseDescription"
//                             type="text"
//                             className="form-control mt-2"
//                             id="courseDescription"
//                             defaultValue={currentCourse.description}
//                             onChange={handleChangeCourseDescription}
//                         />
//                         <br />

//                         {/* Current enrolled students */}
//                         <h5>Enrolled students</h5>
//                         {currentCourse.students && (currentCourse.students.map((student) => (
//                             <div>
//                                 <input className="h5" type="checkbox" name="students" value={student._id} onChange={handleChange} defaultChecked />
//                                 <label className="p" htmlFor={student._id}>&emsp;{student.email}</label>
//                             </div>
//                         )))}
//                         <br />



//                         {/* Search student by email */}
//                         <h5 className="mt-3">Add student by email &emsp; <button className="btn btn-warning btn-sm" onClick={searchEmail}>Search and add</button></h5>
//                         <input
//                             name="StudentEmail"
//                             type="text"
//                             className="form-control mt-3"
//                             id="StudentEmail"
//                             onChange={handleChangeSearchedStudentEmail}
//                         />
//                         <br />
//                         {/* new students */}
//                         <h5>New students</h5>
//                         {addStudentsEmail && (addStudentsEmail.map((email, index) => (
//                             <p>{email}</p>
//                         )))}
//                         <br />


//                         {/* Update and delete button */}
//                         <p><button id="update" className="btn btn-primary" onClick={updateCourse} >Update</button> <button id="delete" className="btn btn-danger" onClick={deleteCourse} >Delete</button></p> */}
