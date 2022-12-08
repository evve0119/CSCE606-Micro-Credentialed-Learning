import React, { useState, useEffect } from "react";
import {useHistory, useLocation, Link } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";
import Accordion from 'react-bootstrap/Accordion';
import "../style.css"


const RecruiterHomePageComponent = (props) => {
  let location = useLocation();
  let [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();



  // render new group form

  const renderNewJobForm = () => {
    history.push("/recruiter/jobs/new")
  };

  const renderProfileForm = () => {
    history.push({
      pathname: "/recruiter/intro",
      state: { background: location }
    })
  };

  const renderResumeForm = (resumeId) => {
    history.push(`/student/resumes/${resumeId}?share=true`);
  };

  /*
  const renderSendCredential = (teachId) => {
    history.push("/instructor/courses/"+teachId+"/sendCredential");
  };
  */
  const renderEdit = (jobId) => {
    history.push({
      pathname: `/recruiter/jobs/${jobId}/edit`,
      state: { background: location }
    })

      // history.push(`/recruiter/jobs/${jobId}/edit`);
  };
  const renderJobPage = (jobId) => {
    history.push(`/jobs/${jobId}`);
  };
  const renderCompanyForm = () => {
    history.push("/recruiter/intro")
  };

    //  Get current user all information from database
  useEffect(() => {
    RecruiterService.renderMyHomePage()
    .then(({ data }) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [location]);

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
        <>
          {currentUser && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-3 profile-bg">
                  <div className="phone-profile-bg">
                  <Profile
                    currentUser={currentUser}
                    renderProfileForm={renderProfileForm}
                    renderCompanyForm = {renderCompanyForm}
                  />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card-bg">
                    <Job
                      currentUser={currentUser}
                      renderNewJobForm = {renderNewJobForm}
                      renderEdit = {renderEdit}
                      renderJobPage={renderJobPage}
                      renderResumeForm = {renderResumeForm}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Profile = (props) => {
  const profile = props.currentUser.profile;
  const company = props.currentUser.company;
  return(
    <>
      <i className="bi bi-person-fill icon-profile"></i>
      <button id="addNewGroup" className="btn btn-profile" onClick={props.renderProfileForm}>
          <i className="bi bi-pencil-fill icon-profile-edit"></i>
      </button>
      <h3>{profile.firstName} {profile.lastName}</h3>
      <h5> <i className="bi bi-envelope-fill icon-n"></i> <br/> {profile.email} </h5>
      <h5> <i className="bi bi-telephone-fill icon-n"></i> <br/> {profile.phone} </h5>
      <h5> <i className="bi bi bi-building-fill icon-n"></i> <br/> {company}</h5>
      <h5> <i className="bi bi-geo-alt-fill icon-n"></i> <br/> {profile.address}</h5>
      <pre>{profile.description}</pre>
    </>
  )
};

const Job = (props) => {
  return(
    <>
      <h3>Jobs
        <button className="btn btn-round" onClick={props.renderNewJobForm}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </h3>
      <table className="table table-borderless">
        <tbody>
          {props.currentUser.jobs.map((jobs) => (
            <tr key={jobs._id}>
              <td className="td-title">
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey={jobs._id}>
                    <Accordion.Header>
                      {jobs.name}
                    </Accordion.Header>
                    <Accordion.Body>
                      {jobs.resumes.length >= 1 && <h5>Applicants:</h5>}

                      {jobs.resumes.map((resume) => (
                        <li key={resume._id}>
                          <Link className="text-primary h6" onClick={() => {props.renderResumeForm(resume._id)}}>
                            {resume.profile.firstName} {resume.profile.lastName}
                          </Link>
                        </li>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
              <td className="td-icon">
                <button className="btn btn-round" onClick={() => {props.renderJobPage(jobs._id)  }}>
                  <i className="bi bi-journal"></i>
                </button>
                <button className="btn btn-round" onClick={()=>{props.renderEdit(jobs._id)}}>
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </>
  )
};

export default RecruiterHomePageComponent;



// {currentUser && (
//   <div>
//     <header className="">
//       <h3>
//         Name: {currentUser.username}
//       </h3>
//       <h3>
//         Email: {currentUser.email}
//       </h3>
//       <h3>
//         Company: {currentUser.company}
//       </h3>
//     </header>
//     <button id="editCompany" className="btn btn-primary" onClick={renderCompanyForm}>
//       Edit
//     </button>
//   </div>
// )}
// {/* Show all courses (if login) */}
// {currentUser && (
//   <div>
//     <h3 className="mt-5 mb-3">Jobs &emsp;
//       <button id="addNewJob" className="btn btn-primary" onClick={renderNewJobForm}>
//         Add new job
//       </button>
//     </h3>
//     <div>
//       {currentUser.jobs.map((jobs) => (
//         <div key={jobs._id} className="mb-3">
//           <Link className="text-primary h3" to={`jobs/${jobs._id}/applications`}>{jobs.name}</Link> &emsp;&emsp;
//           <button className="btn btn-warning" onClick={() => renderEdit(jobs._id)} >Edit</button> &emsp;&emsp;
//           <button className="btn btn-success" onClick={() => renderJobPage(jobs._id)} >View job</button> &emsp;&emsp;
//           {/* <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button> */}
//         </div>
//       ))}
//     </div>
//   </div>
// )}






// import React, { useState, useEffect } from "react";
// import { useHistory, Link } from "react-router-dom";
// import RecruiterService from "../../services/recruiter.service";

// const RecruiterHomePageComponent = (props) => {
//   let [currentUser, setCurrentUser] = useState(null);
//   //  Get current user all information from database
//   useEffect(() => {
//     RecruiterService.renderMyHomePage()
//     .then(({ data }) => {
//       setCurrentUser(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);

//   // render new group form
//   const history = useHistory();
//   const renderNewJobForm = () => {
//     history.push("/recruiter/jobs/new")
//   }
//   /*
//   const renderSendCredential = (teachId) => {
//     history.push("/instructor/courses/"+teachId+"/sendCredential");
//   };
//   */
//   const renderEdit = (jobId) => {
//     history.push(`/recruiter/jobs/${jobId}/edit`);
//   };
//   const renderJobPage = (jobId) => {
//     history.push(`/jobs/${jobId}`);
//   };
//   const renderCompanyForm = () => {
//     history.push("/recruiter/intro")
//   }


//   return (
//     <div style={{ padding: "3rem" }}>
//       {/* If not login*/}
//       {!props.currentRole && (
//         <h1>Please Login</h1>
//       )}
//       {/* If not recruiter*/}
//       {props.currentRole && props.currentRole !== "recruiter" && (
//         <h1>You Are Not a Recruiter</h1>
//       )}
//       {/* If login and recruiter */}
//       {props.currentRole && props.currentRole === "recruiter" && (
//         <>
//         {currentUser && (
//           <div>
//             <h1 className="mb-3">My home page</h1>
//             <header className="">
//               <h3>
//                 Name: {currentUser.username}
//               </h3>
//               <h3>
//                 Email: {currentUser.email}
//               </h3>
//               <h3>
//                 Company: {currentUser.company}
//               </h3>
//             </header>
//             <button id="editCompany" className="btn btn-primary" onClick={renderCompanyForm}>
//               Edit
//             </button>
//           </div>
//         )}
//         {/* Show all courses (if login) */}
//         {currentUser && (
//           <div>
//             <h3 className="mt-5 mb-3">Jobs &emsp;
//               <button id="addNewJob" className="btn btn-primary" onClick={renderNewJobForm}>
//                 Add new job
//               </button>
//             </h3>
//             <div>
//               {currentUser.jobs.map((jobs) => (
//                 <div key={jobs._id} className="mb-3">
//                   <Link className="text-primary h3" to={`jobs/${jobs._id}/applications`}>{jobs.name}</Link> &emsp;&emsp;
//                   <button className="btn btn-warning" onClick={() => renderEdit(jobs._id)} >Edit</button> &emsp;&emsp;
//                   <button className="btn btn-success" onClick={() => renderJobPage(jobs._id)} >View job</button> &emsp;&emsp;
//                   {/* <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RecruiterHomePageComponent;
