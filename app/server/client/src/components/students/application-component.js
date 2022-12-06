import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import StudentService from "../../services/student.service";

const ApplicationComponent = (props) => {
  let [currentUser, setCurrentUser] = useState(null);
  const [currentResume, setResume] = useState(null);
  const jobId = useParams().jobId;

  useEffect(() => {
    StudentService.renderMyHomePage()
    .then(({ data }) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // render new group form
  const history = useHistory();
  const renderNewResume = () =>{
    history.push("/student/resumes/new");
  }

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setResume(value);
    }
    else {
      setResume(null);
    }
  };

  const apply = () => {
    if(currentResume === null){
      window.alert("Please choose a resume!")
    }
    else{
      StudentService.submitResume(currentResume, jobId)
      .then(() => {
        window.alert("Resume is submitted!")
        history.push("/student/home")
      }).catch((err) => {
        console.log(err.response.data)
      });
    }
  }

  return (
    <div>
      {/* If not login or not student*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If not student*/}
      {props.currentRole && props.currentRole !== "student" && (
        <h1>You Are Not a Student</h1>
      )}
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" && (
        <>
        {currentUser && (
          <div className="card-bg pb-3">
          <h3 className="mb-4">Resumes</h3>
          <div>
            {currentUser.resumes.map((resume) => (
              <div key={resume._id} className="mb-3">
                <input className="h3" type="checkbox" name="chooseResume" 
                  value={resume._id} checked={currentResume === resume._id} onChange={handleChange}/>
                <label className="h3" htmlFor={resume._id}>
                  <Link className="text-primary h4" to={`/student/resumes/${resume._id}`}>{resume.name}</Link>
                </label>
              </div>
            ))}
            <button className="btn btn-primary" onClick={apply}>
              Apply
            </button>
          </div>
          </div>
        )}
      </>
      )}
    </div>
  );
};

export default ApplicationComponent;
