import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service"

const ResumeFormComponent = (props) => {
  const resumeId = useParams().resumeId;
  const [message, setMessage] = useState(null);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ credentials, setCredentials ] = useState([]);
  const history = useHistory();

  const renderEditResumeForm = ()=> {
    history.push(`/student/resumes/${resumeId}/edit`);
  }

  useEffect(() => {
    StudentService.renderResumeForm(resumeId)
    .then(({ data }) => {
      setFirstName(data.profile.firstName);
      setLastName(data.profile.lastName);
      setAddress(data.profile.address);
      setPhone(data.profile.phone);
      setEmail(data.profile.email);
      setDescription(data.profile.description);
      setCredentials([...credentials, ...data.credentials]);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
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
        <div className="form-resume">
          <h1>{firstName} {lastName}</h1>
          <h5>
            { phone && (<>Phone: {phone} &emsp;</>)}
            { email && (<>Email: {email} &emsp;</>)}  
          </h5>
          <h5>{address && (<>Address: {address} &emsp;</>)}</h5>
          <pre>{description}</pre>
          <br></br>
          <div>
            <h3>Credentials</h3>
            {credentials && (credentials.map((credential) => (
              <li key={credential._id}> {credential.name}</li>
            )))}
          </div>
          <br />
          <button className="btn btn-primary" onClick={renderEditResumeForm}>Edit</button>
          <br />
          {message && (
            <div className="alert alert-warning mt-3" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeFormComponent;
