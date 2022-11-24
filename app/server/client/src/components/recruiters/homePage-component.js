import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";

const RecruiterHomePageComponent = (props) => {
  let [currentUser, setCurrentUser] = useState(null);
  //  Get current user all information from database
  useEffect(() => {
    RecruiterService.renderMyHomePage()
    .then(({ data }) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // render new group form
  const history = useHistory();
  const renderNewJobForm = () => {
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
    history.push(`/jobs/${jobId}`);
  };
  const renderCompanyForm = () => {
    history.push("/recruiter/intro")
  }


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
        <>
        {currentUser && (
          <div>
            <h1 className="mb-3">My home page</h1>
            <header className="">
              <h3>
                Name: {currentUser.username}
              </h3>
              <h3>
                Email: {currentUser.email}
              </h3>
              <h3>
                Company: {currentUser.company}
              </h3>
            </header>
            <button id="editCompany" className="btn btn-primary" onClick={renderCompanyForm}>
              Edit
            </button>
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
                <div key={jobs._id} className="mb-3">
                  <Link className="text-primary h3" to={`jobs/${jobs._id}/applications`}>{jobs.name}</Link> &emsp;&emsp;
                  <button className="btn btn-warning" onClick={() => renderEdit(jobs._id)} >Edit</button> &emsp;&emsp;
                  <button className="btn btn-success" onClick={() => renderJobPage(jobs._id)} >View job</button> &emsp;&emsp;
                  {/* <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button> */}
                </div>
              ))}
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default RecruiterHomePageComponent;