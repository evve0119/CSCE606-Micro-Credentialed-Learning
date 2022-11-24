import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";

const RenderResumeComponent = (props) => {
  const jobId = useParams().jobId;
  const resumeId = useParams().resumeId;
  const [message, setMessage] = useState(null);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ credentials, setCredentials ] = useState([]);

  useEffect(() => {
    RecruiterService.renderResume(jobId, resumeId)
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
        <h1>{firstName} {lastName}</h1>
        <h5>
            { phone && (<>Phone: {phone} &emsp;</>)}
            { email && (<>Email: {email} &emsp;</>)}  
        </h5>
        <h5>{ address && (<>Address: {address} &emsp;</>)}</h5>
        <pre>{description}</pre>
        <br></br>
        <div>
            <h3>Credentials</h3>
            {credentials && (credentials.map((credential) => (
                <li key={credential._id}> {credential.name}</li>
            )))}
        </div>
        {message && (
            <div className="alert alert-warning mt-3" role="alert">
                {message}
            </div>
        )}
        </>
      )}
    </div>
  );
};

export default RenderResumeComponent;
