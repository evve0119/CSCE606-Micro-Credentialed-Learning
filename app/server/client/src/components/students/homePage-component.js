import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import StudentService from "../../services/student.service";

const StudentHomePageComponent = (props) => {
  let [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const renderNewGroupForm = () => {
    history.push("/student/groups/new")
  }
  const renderProfileForm = () => {
    history.push("/student/intro")
  }
  const renderNewResume = () => {
    history.push("/student/resumes/new")
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
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
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
                renderEditResumeForm={renderEditResumeForm}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

const Profile = (props) => {
  const profile = props.currentUser.profile;
  return (
    <div>
      <h3 className="mb-3">Profile  &emsp;&emsp;
        <button id="editProfile" className="btn btn-primary" onClick={props.renderProfileForm}>
          Edit
        </button>
      </h3>
      {profile.firstName && (
        <h5>{profile.firstName} {profile.lastName}</h5>
      )}
      <h6> Email: {profile.email} </h6>
      <h6> Phone: {profile.phone} </h6>
      <h6> Address: {profile.address}</h6>
      <pre>{profile.description}</pre>

    </div>
  )
};

const Group = (props) => {
  return (
    <div>
      <h3 className="mt-5 mb-3">Groups &emsp;&emsp;
        <button id="addNewGroup" className="btn btn-primary" onClick={props.renderNewGroupForm}>
          Add
        </button>
      </h3>
      <div>
        {props.currentUser.groups.map((group) => (
          <div key={group._id} className="mb-3">
            <Link className="text-primary h5" to={`groups/${group._id}`}>{group.name}</Link>
            {group.credentials.map((credential) => (
              <li key={credential._id}>{credential.name}</li>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

const Resume = (props) => {
  return (
    <div>
      <h3 className="mt-5 mb-3">Resumes &emsp;&emsp;
        <button id="addNewResume" className="btn btn-primary" onClick={props.renderNewResume}>
          Add
        </button>
      </h3>
      <div>
        {props.currentUser.resumes.map((resume) => (
          <div key={resume._id} className="mb-3">
            <Link className="text-primary h5" to={`resumes/${resume._id}`}>{resume.name}</Link>
            <button className="btn btn-primary" onClick={() => props.renderEditResumeForm(resume._id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  )
};
export default StudentHomePageComponent;
