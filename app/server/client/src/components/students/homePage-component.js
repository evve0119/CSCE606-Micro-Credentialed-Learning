import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation  } from "react-router-dom";
import StudentService from "../../services/student.service";
import Accordion from 'react-bootstrap/Accordion';
import "../style.css"

const StudentHomePageComponent = (props) => {
  let location = useLocation();
  let [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const renderProfileForm = () => {
    history.push({
      pathname: "/student/intro",
      state: { background: location }
    })
  }
  const renderNewGroupForm = () => {
    history.push("/student/groups/new")
  }
  const renderGroupForm = (groupId)=> {
    history.push(`/student/groups/${groupId}`);
  }

  const renderNewResume = () =>{
    history.push("/student/resumes/new");
  }
  const renderResumeForm = (resumeId)=> {
    history.push(`/student/resumes/${resumeId}`);
  }
  const renderEditResumeForm = (resumeId)=> {
    history.push(`/student/resumes/${resumeId}/edit`);
  }

  useEffect(() => {
    StudentService.renderMyHomePage()
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
      {/* If not student*/}
      {props.currentRole && props.currentRole !== "student" && (
        <h1>You Are Not a Student</h1>
      )}
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" && (
        <>
        {currentUser && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 pt-3 px-5 text-light profile-bg">
                <Profile 
                  currentUser={currentUser}
                  renderProfileForm={renderProfileForm}
                />
              </div>
              <div className="col">
                <div className="m-5 px-5 pt-3 border rounded-3 card-bg shadow-sm">
                  <Group 
                    currentUser={currentUser}
                    renderNewGroupForm={renderNewGroupForm}
                    renderGroupForm={renderGroupForm}
                  />
                </div>
                <div className="m-5 px-5 pt-3 border rounded-3 card-bg shadow-sm">
                  <Resume
                    currentUser={currentUser}
                    renderNewResume={renderNewResume}
                    renderResumeForm={renderResumeForm}
                    renderEditResumeForm={renderEditResumeForm}
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
  return(
    <>
      <i className="bi bi-person-fill icon-profile"></i>
      {profile.firstName && (
        <h3>{profile.firstName} {profile.lastName}
        <button id="addNewGroup" className="btn" onClick={props.renderProfileForm}>
        <i className="bi bi-pencil-fill icon-profile-edit"></i>
      </button></h3>
      )}
      <h5> <i className="bi bi-envelope-fill icon-n"></i> {profile.email} </h5>
      <h5> <i className="bi bi-telephone-fill icon-n"></i> {profile.phone} </h5>
      <h5> <i className="bi bi-geo-alt-fill icon-n"></i> {profile.address}</h5>
      <pre>{profile.description}</pre>
    </>
  )
};

const Group = (props) => {
  return(
    <>
      <h3>Groups &emsp;
      <button id="addNewGroup" className="btn btn-round" onClick={props.renderNewGroupForm}>
        <i className="bi bi-plus-lg"></i>
      </button>
      </h3>
      <table class="table table-borderless">
        <tbody>
      {props.currentUser.groups.map((group) => (
        <>
        <tr>
          <td className="td-title"> 
          <Accordion defaultActiveKey="0" flush alwaysOpen>
          <Accordion.Item eventKey={group._id}>
            <Accordion.Header>
              {group.name}
            </Accordion.Header> 
            <Accordion.Body>
            {group.credentials.map((credential) => (
              <li key={credential._id}>{credential.name}</li>
            ))}
            </Accordion.Body>
          </Accordion.Item>  
          </Accordion>
          </td>
          <td className="td-icon">
            <button id="addNewGroup" className="btn btn-edit" onClick={()=>{props.renderGroupForm(group._id)}}>
              <i class="bi bi-pencil-fill"></i>
            </button>
            </td>
        </tr>
        </>
      ))}
      </tbody>
      </table>
      {/* <Accordion defaultActiveKey="0" flush alwaysOpen>
        {props.currentUser.groups.map((group) => (
          <>
          <Accordion.Item eventKey={group._id}>
            <div className="test">
            <Accordion.Header>
              {group.name}
            </Accordion.Header> 
            <button id="addNewGroup" className="btn btn-edit" onClick={()=>{props.renderGroupForm(group._id)}}>
              <i class="bi bi-pencil-fill"></i>
            </button>
            </div>
            
            <Accordion.Body>
            {group.credentials.map((credential) => (
              <li key={credential._id}>{credential.name}</li>
            ))}
            </Accordion.Body>
          </Accordion.Item>  
        
          
        </>
        ))}
    </Accordion> */}
        {/* {props.currentUser.groups.map((group) => (
          <div key={group._id} className="mb-3">
            <Link className="text-primary h5" to={`groups/${group._id}`}>{group.name} </Link>
            {group.credentials.map((credential) => (
              
              <li key={credential._id}>{credential.name}</li>
            ))}
          </div>
        ))} */}
    </>
  )
};

const Resume = (props) => {
  return(
    <>
      <h3>Resumes &emsp;
      <button id="addNewGroup" className="btn btn-round" onClick={props.renderNewResume}>
        <i className="bi bi-plus-lg"></i>
      </button>
      </h3>
      
      <table class="table table-borderless">
        <tbody>
        {props.currentUser.resumes.map((resume) => (
            <tr>
            <td className="td-title ">
            <p className="td-text">{resume.name}</p>
            </td>
            <td className="td-icon">
              <button id="addNewGroup" className="btn btn-edit" onClick={()=>{props.renderResumeForm(resume._id)}}>
                <i className="bi bi-search"></i>
              </button>
              <button id="addNewGroup" className="btn btn-edit" onClick={()=>{props.renderEditResumeForm(resume._id)}}>
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
export default StudentHomePageComponent;
