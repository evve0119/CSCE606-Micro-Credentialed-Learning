import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  const renderGroupForm = (groupId) => {
    history.push(`/student/groups/${groupId}`);
  }

  const renderNewResume = () => {
    history.push("/student/resumes/new");
  }
  const renderResumeForm = (resumeId) => {
    history.push(`/student/resumes/${resumeId}`);
  }
  const renderEditResumeForm = (resumeId) => {
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
                <div className="col-sm-3 profile-bg" >
                  <div className="phone-profile-bg">
                  <Profile
                    currentUser={currentUser}
                    renderProfileForm={renderProfileForm}
                  />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card-bg">
                    <Group
                      currentUser={currentUser}
                      renderNewGroupForm={renderNewGroupForm}
                      renderGroupForm={renderGroupForm}
                    />
                  </div>
                  <div className="card-bg">
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
  return (
    <>
      <i className="bi bi-person-fill icon-profile"></i>
      <button id="addNewGroup" className="btn btn-profile" onClick={props.renderProfileForm}>
        <i className="bi bi-pencil-fill icon-profile-edit"></i>
      </button>
      {profile.firstName && (
        <div>
          <h3>{profile.firstName} {profile.lastName}</h3>
        </div>
      )}
      <h5> <i className="bi bi-envelope-fill icon-n"></i> <br/> {profile.email} </h5>
      <h5> <i className="bi bi-telephone-fill icon-n"></i> <br/> {profile.phone} </h5>
      <h5> <i className="bi bi-geo-alt-fill icon-n"></i> <br/> {profile.address}</h5>
      <pre>{profile.description}</pre>
    </>
  )
};

const Group = (props) => {
  return (
    <>
      <h3>Groups
        <button className="btn btn-round" onClick={props.renderNewGroupForm}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </h3>
      <table className="table table-borderless">
        <tbody>
          {props.currentUser.groups.map((group) => (
            <tr key={group._id}>
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
                <button className="btn btn-round" onClick={() => { props.renderGroupForm(group._id) }}>
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

const Resume = (props) => {
  return (
    <>
      <h3>Resumes
        <button className="btn btn-round" onClick={props.renderNewResume}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </h3>
      <table className="table table-borderless">
        <tbody>
          {props.currentUser.resumes.map((resume) => (
            <tr key={resume._id}>
              <td className="td-title ">
                {resume.name}
              </td>
              <td className="td-icon">
                <button className="btn btn-round" onClick={() => { props.renderResumeForm(resume._id) }}>
                  <i className="bi bi-search"></i>
                </button>
                <button className="btn btn-round" onClick={() => { props.renderEditResumeForm(resume._id) }}>
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
