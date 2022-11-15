import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import JobService from "../../services/job.service";

const JobHomePageComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [currentJob, setCurrentJob] = useState(null);
  let [currentJobId, setCurrentJobId] = useState(useParams()._id)
  const history = useHistory();
  const apply = () =>{
    history.push("/student/applications/"+currentJobId);
  }

  useEffect(() => {
    JobService.renderJobPage(currentJobId)
      .then(({ data }) => {
        setCurrentJob(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
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
        {currentJob && (
          <>
            <div>
              <h1>{currentJob.name}</h1>
              <br />
              <h4>Recruiter</h4>
              <p>{currentJob.holder.username}</p>
              <br />
              <h4>Description</h4>
              <p>{currentJob.description}</p>
              <br />
            </div>
            {currentUser && currentUser.user.role == "student" && (
              <button className="btn btn-primary" onClick={apply}>
                Apply
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobHomePageComponent;