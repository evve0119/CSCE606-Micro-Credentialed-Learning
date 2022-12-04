import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';
import {Modal, Form, Button} from 'react-bootstrap';

const ProfileForm = (props) => {
  return(
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control
        type={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </Form.Group>
  );
};

const EditResumeFormComponent = (props) => {
  const resumeId = useParams().resumeId;
  const [ message, setMessage ] = useState(null);
  const [ resumeName, setResumeName] = useState("");
  const [ currentFirstName, setFirstName ] = useState("");
  const [ currentLastName, setLastName ] = useState("");
  const [ currentAddress, setAddress ] = useState("");
  const [ currentPhone, setPhone ] = useState("");
  const [ currentEmail, setEmail ] = useState("");
  const [ currentDescription, setDescription ] = useState("");
  const [ addCredentials, setAddCredentials ] = useState([]);
  const [ credentialData, setCredentialData ] = useState([]);
  const history = useHistory();

  const handleChangeResumeName = (e) => {
    setResumeName(e.target.value);
  };
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChange = (value) => {
    setAddCredentials(value);
  };
  const handleClose = () => {
    history.push(`/student/resumes/${resumeId}`);
  };

  const updateResume = () => {
    const addProfile = {
      firstName: currentFirstName,
      lastName: currentLastName,
      address: currentAddress,
      phone: currentPhone,
      email: currentEmail,
      description: currentDescription,
    };
    const addCred = [];
    addCredentials.map((credential) => {
      addCred.push(credential.value);
    });
    StudentService.updateResume(resumeName, addProfile, addCred, resumeId)
    .then(() => {
      window.alert("The resume is updated!");
      history.push(`/student/resumes/${resumeId}`);
    }).catch((err) => {
      setMessage(err.response.data);
    });
  };  

  const deleteResume = () => {
    StudentService.deleteResume(resumeId)
    .then(() => {
      window.alert("Resume is deleted!");
      history.push("/student/home");
    }).catch((err) => {
      setMessage(err.response.data);
    });
  };

  useEffect(() => {
    StudentService.renderMyHomePage()
    .then(({data}) => {
      const groups = [];
      (data.groups).map((group) => {
        const options = [];
        (group.credentials).map((credential) => {
          let temp = {value: credential._id, label: credential.name};
          options.push(temp);
        })
        groups.push({label: group.name, options:options});
      })
      const allCred = [];
      (data.credentials).map((credential) => { 
        allCred.push({value:credential._id, label:credential.name});
      })
      groups.push({label:"all", options:allCred});
      setCredentialData([...credentialData, ...groups]);
    })
    StudentService.renderResumeForm(resumeId)
    .then(({ data }) => {
      setResumeName(data.name);
      setFirstName(data.profile.firstName);
      setLastName(data.profile.lastName);
      setAddress(data.profile.address);
      setPhone(data.profile.phone);
      setEmail(data.profile.email);
      setDescription(data.profile.description);
      const options = [];
      (data.credentials).map((credential) => {
        options.push({value:credential._id, label:credential.name});
      })
      setAddCredentials(options);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" && (
        <>
        <Modal show={true} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit {resumeName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <ProfileForm 
                name={"Resume Name"}
                defaultValue={resumeName}
                onChange={handleChangeResumeName}
              />
              <ProfileForm 
                name={"First Name"}
                defaultValue={currentFirstName}
                onChange={handleChangeFirstName}
              />
              <ProfileForm 
                name={"Last Name"}
                defaultValue={currentLastName}
                onChange={handleChangeLastName}
              />
              <ProfileForm 
                name={"Email"}
                defaultValue={currentEmail}
                onChange={handleChangeEmail}
              />
              <ProfileForm 
                name={"Phone"}
                defaultValue={currentPhone}
                onChange={handleChangePhone}
              />
              <ProfileForm 
                name={"Address"}
                defaultValue={currentAddress}
                onChange={handleChangeAddress}
              />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  value={currentDescription} 
                  onChange={handleChangeDescription}
                />
              </Form.Group>
            </Form>
            <p>Credentials</p>
            <Select
              name="credentials"
              className="basic-multi-select"
              classNamePrefix="select"
              options={credentialData}
              value={addCredentials}
              isMulti
              closeMenuOnSelect={false}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteResume}>
              Delete
            </Button>
            <Button variant="primary" onClick={updateResume}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
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

export default EditResumeFormComponent;