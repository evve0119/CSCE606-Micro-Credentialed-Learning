import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service";

const ApplicationComponent = (props) => {
  let [currentUser, setCurrentUser] = useState(props.currentUser.user);
  const [currentResume, setResume] = useState(null);
  const jobId = useParams()._id;
  //  Get current user all information from database
  useEffect(() => {
    StudentService.renderMyHomePage(AuthService.getCurrentUser().user._id)
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
      StudentService.submitResume(currentUser._id, currentResume, jobId)
      .then(() => {
        window.alert("Resume is submitted!")
        history.push("/student/home")
      }).catch((err) => {
        setMessage(err.response.data)
      });
    }
  }

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login or not student*/}
      {!currentUser && (
        <h1>You are not authorized</h1>
      )}
      {/* If login and student */}
      {currentUser && (
        <>
        <h3 className="mb-3">Resumes &emsp;&emsp;
        <button id="addNewResume" className="btn btn-primary" onClick={renderNewResume}>
          Add
        </button>
        </h3>
        <div>
          {currentUser.resumes.map((resume) => (
            <div key={resume._id} className="mb-3">
              <input className="h3" type="checkbox" name="chooseResume" 
                    value={resume._id} checked={currentResume === resume._id} onChange={handleChange}/>
              <label className="h3" htmlFor={resume._id}>
                <Link className="text-primary h5" to={`/student/resumes/${resume._id}`}>{resume.name}</Link>
              </label>
            </div>
          ))}
          <button className="btn btn-primary" onClick={apply}>
            Apply
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default ApplicationComponent;
