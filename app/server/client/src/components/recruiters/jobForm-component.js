import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";
import {Modal, Form, Button} from "react-bootstrap";

const JobForm = (props) => {
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

const JobFormComponent = (props) => {
    const jobId = useParams().jobId;
    const history = useHistory();

    let [message, setMessage] = useState(null);
    let [currentJob, setCurrentJob] = useState(null);
    let [newJobName, setNewJobName] = useState("");
    let [newJobDescription, setNewJobDescription] = useState("");
    //let [editStudents, setEditStudents] = useState([]);
    //let [searchedStudentEmail, setSearchedStudentEmail] = useState(null);
    //let [addStudentsId, setAddStudentsId] = useState([])
    //let [addStudentsEmail, setAddStudentsEmail] = useState([])

    useEffect(() => {
        RecruiterService.renderJobForm(jobId)
            .then(({ data }) => {
                setCurrentJob(data);
                /*
                let studentsId = []
                data.students.map((student) => {
                    studentsId = [...studentsId, student._id]
                })
                setEditStudents(studentsId);
                */
                setNewJobName(data.name)
                setNewJobDescription(data.description)
            })
            .catch((err) => {
                setMessage(err.response.data);

            });
    }, []);

    // If not holder go to login
    const handleTakeToLogin = () => {
        history.push("/");
    };

    // Handle new course name
    const handleChangeJobName = (e) => {
        setNewJobName(e.target.value);
    };

    // Handel new course description
    const handleChangeJobDescription = (e) => {
        setNewJobDescription(e.target.value)
    };

    const handleClose = e => {
        history.push("/recruiter/home");
      };

    /*
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
    */

    // Update job
    const updateJob = () => {
        //RecruiterService.updateJob(currentCourse._id, newCourseName, newCourseDescription, editStudents).then(() => {
        RecruiterService.updateJob(currentJob._id, newJobName, newJobDescription).then(() => {
            window.alert("Job is updated!");
            history.push("/recruiter/home");
        }).catch((err) => {
            setMessage(err.response.data);
        });
    };

    // Delete job
    const deleteJob = () => {
        RecruiterService.deleteJob(jobId).then(()=>{
            window.alert("Job is deleted!");
            history.push("/recruiter/home");
        }).catch((err)=>{
            setMessage(err.response.data);
        });
    };



    return (
        <div>
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
            <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Edit {currentJob.name}</Modal.Title> */}
                    <Modal.Title>Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <JobForm
                        name={"Name"}
                        defaultValue={newJobName}
                        onChange={handleChangeJobName}
                    />
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={12}
                        value={newJobDescription}
                        onChange={handleChangeJobDescription}
                        />
                    </Form.Group>
                    </Form>
                    {message && (
                    <div className="alert alert-warning mt-3" role="alert">
                        {message}
                    </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteJob}>
                    Delete
                    </Button>
                    <Button variant="primary" onClick={updateJob}>
                    Update
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default JobFormComponent;

{/* <>
{currentJob && (
    <div
        className="form-group"
        style={{
            position: "absolute",
            background: "#fff",
            top: "10%",
            left: "10%",
            right: "10%",
            padding: 15,
            border: "2px solid #444"
        }}
    >
        {/* Course name */}
        // <h1>Edit {currentJob.name}</h1>
        // <br />
        // <label className="h5" htmlFor="courseName">Name</label>
        // <input
        //     name="jobName"
        //     type="text"
        //     className="form-control mt-2"
        //     id="jobName"
        //     defaultValue={currentJob.name}
        //     onChange={handleChangeJobName}
        // />
        // <br />

        // {/* Job description */}
        // <label className="h5" htmlFor="jobDescription">Description</label>
        // <input
        //     name="jobDescription"
        //     type="text"
        //     className="form-control mt-2"
        //     id="jobDescription"
        //     defaultValue={currentJob.description}
        //     onChange={handleChangeJobDescription}
        // />
        // <br />

//         {/* Update and delete button */}
//         <p><button id="update" className="btn btn-primary" onClick={updateJob} >Update</button> <button id="delete" className="btn btn-danger" onClick={deleteJob} >Delete</button></p>



//         {message && (
//             <div className="alert alert-warning mt-3" role="alert">
//                 {message}
//             </div>
//         )}
//     </div>
// )}
// </> */}
