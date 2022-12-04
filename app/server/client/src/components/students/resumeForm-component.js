import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service"

const ResumeFormComponent = (props) => {
  const resumeId = useParams().resumeId;
  const [message, setMessage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [credentials, setCredentials] = useState([]);
  const history = useHistory();

  const renderEditResumeForm = () => {
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
        <div className="form-resume">
          <h1>{firstName} {lastName}</h1>
          <h5>
            {phone && (<>Phone: {phone} &emsp;</>)}
            {email && (<>Email: {email} &emsp;</>)}
          </h5>
          <h5>{address && (<>Address: {address} &emsp;</>)}</h5>
          <pre>{description}</pre>
          <br></br>
          <div>
            <h3>Credentials</h3>
            {credentials && (credentials.map((credential,idx) => (
              <div>
                <a  type="button" class="link-primary" data-bs-toggle="modal" data-bs-target={"#ModalLabel"+idx}>{credential.name}</a>
                <div class="modal fade " id={"ModalLabel"+idx} tabindex="-1" aria-labelledby={"ModalLabel"+idx} aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id={"ModalLabel"+idx}>{credential.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Credential ID: {credential._id} <br></br>
                          Holder: {credential.holderUsername} <br></br>
                          Instructor: {credential.instructorUsername} <br></br>
                          Institute: {credential.institute} <br></br>
                          Issued date: {new Date(credential.issuedDate).toDateString().slice(4)} 
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default ResumeFormComponent;
