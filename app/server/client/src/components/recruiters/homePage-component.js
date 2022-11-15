import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import RecruiterService from "../../services/recruiter.service";

const RecruiterHomePageComponent = () => {
  let [ currentUser, setCurrentUser ] = useState(null);
  //  Get current user all information from database
  useEffect(()=>{
    RecruiterService.renderMyHomePage(AuthService.getCurrentUser().user._id)
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // render new group form
  const history = useHistory();
  const renderNewJobForm = ()=>{
    history.push("/recruiter/jobs/new")
  }
  /*
  const renderSendCredential = (teachId) => { 
    history.push("/instructor/courses/"+teachId+"/sendCredential");
  };
  */
  const renderEdit = (jobId) => {
    history.push(`/recruiter/jobs/${jobId}/edit`);
  };
  const renderJobPage = (jobId) => { 
    history.push("/jobs/"+jobId);
  };

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login */}
      {!currentUser && (
        <div>You are not authorized.</div>
      )}
      {/* If login */}
      {currentUser && (
        <div>
          <h1 className="mb-3">My home page</h1>
          <header className="">
            <h3>
              Name: {currentUser.username}
            </h3>
          </header>
          <h3>
              Email: {currentUser.email}
          </h3>
        </div>
      )}
      {/* Show all courses (if login) */}
      {currentUser && (
          <div>
            <h3 className="mt-5 mb-3">Jobs &emsp;
              <button id="addNewJob" className="btn btn-primary" onClick={renderNewJobForm}>
                Add new job
              </button>
            </h3>
            <div>
              {currentUser.jobs.map((jobs) => (
                <div key={jobs._id}className="mb-3">
                    <Link className="text-primary h3" to={`jobs/${jobs._id}/applications`}>{jobs.name}</Link> &emsp;&emsp;
                    <button className="btn btn-warning" onClick={() => renderEdit(jobs._id)} >Edit</button> &emsp;&emsp;
                    <button className="btn btn-success" onClick={() => renderJobPage(jobs._id)} >View job</button> &emsp;&emsp;
                    {/* <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button> */}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Add new groups (if login) */}
        
    </div>
  );
};

export default RecruiterHomePageComponent;