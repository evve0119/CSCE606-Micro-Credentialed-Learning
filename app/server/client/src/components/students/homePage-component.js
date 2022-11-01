import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service";

const StudentHomePageComponent = () => {
  let [currentUser, setCurrentUser] = useState(null);
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
  const renderNewGroupForm = () => {
    history.push("/student/groups/new")
  }
  const renderProfileForm = () => {
    history.push("/student/intro")
  }
  const renderNewResume = () =>{
    history.push("/student/resumes/new")
  }

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login or not student*/}
      {!currentUser && (
        <div>You are not authorized</div>
      )}
      {/* If login and student */}
      {currentUser && (
        <>
        <Profile 
          currentUser={currentUser}
          renderProfileForm={renderProfileForm}
        />
        <Group 
          currentUser={currentUser}
          renderNewGroupForm={renderNewGroupForm}
        />
        <Resume
          currentUser={currentUser}
          renderNewResume={renderNewResume}
        />
      </>
      )}
    </div>
  );
};

const Profile = (props) => {
  const currentUser = props.currentUser
  const profile = currentUser.profile;
  return(
    <div>
      <h3 className="mt-5 mb-3">Profile
      <button id="editProfile" className="btn btn-primary" onClick={props.renderProfileForm}>
          Edit
      </button>
      </h3>
      {profile.firstName && (
        <h4>{profile.firstName} {profile.lastName}</h4>
      )}
      <h6> Email: {profile.email} </h6>
      <h6> Phone: {profile.phone} </h6>
      <h6> Address: {profile.address}</h6>
      <h6> {profile.description} </h6>

    </div>
  )
};

const Group = (props) => {
  return(
    <div>
      <h3 className="mt-5 mb-3">Groups
      <button id="addNewGroup" className="btn btn-primary" onClick={props.renderNewGroupForm}>
          Add
      </button>
      </h3>
      <div>
        {props.currentUser.groups.map((group) => (
          <div key={group._id} className="mb-3">
            <Link className="text-primary" to={`groups/${group._id}`}>{group.name}</Link>
            {group.credentials.map((credential) => (<h5 key={credential._id}>{credential.name}</h5>))}
          </div>
        ))}
      </div>
    </div>
  )
};

const Resume = (props) => {
  return(
    <div>
      <h3 className="mt-5 mb-3">Resumes
      <button id="addNewResume" className="btn btn-primary" onClick={props.renderNewResume}>
          Add
      </button>
      </h3>
      <div>
        {props.currentUser.resumes.map((resume) => (
          <div key={resume._id} className="mb-3">
            <Link className="text-primary" to={`resumes/${resume._id}`}>{resume.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
};
export default StudentHomePageComponent;
