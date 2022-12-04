import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';
import {Modal, Form, Button} from 'react-bootstrap';

const ProfileForm = (props) => {
  return(
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.name}</Form.Label>
      {props.disable && (
        <Form.Control
        type={props.name}
        defaultValue={props.defaultValue}
        disabled
      />
      )}
      {!props.disable && (
        <Form.Control
        type={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      )}
    </Form.Group>
  );
};

const NewResumeFormComponent = (props) => {
  const [message, setMessage] = useState(null);
  const [ resumeName, setResumeName] = useState("");
  const [ currentFirstName, setFirstName ] = useState("");
  const [ currentLastName, setLastName ] = useState("");
  const [ currentAddress, setAddress ] = useState("");
  const [ currentPhone, setPhone ] = useState("");
  const [ currentEmail, setEmail ] = useState("");
  const [ currentDescription, setDescription ] = useState("");
  const [ credentialData, setCredentialData ] = useState([]);
  const [ addCredentials, setAddCredentials ] = useState([]);
  const history = useHistory();
  
  const handleChangeResumeName = (e) => {
    setResumeName(e.target.value);
  };
  // const handleChangeFirstName = (e) => {
  //   setFirstName(e.target.value);
  // };
  // const handleChangeLastName = (e) => {
  //   setLastName(e.target.value);
  // };
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
    history.push("/student/home");
  };
  const postResume = () => {
    if(resumeName === ""){
      setMessage("Resume name is not allowed to be empty!");
    }
    else{
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
      StudentService.createNewResume(resumeName, addProfile, addCred)
      .then(() => {
        window.alert("New resume is created!")
        history.push("/student/home")
      }).catch((err) => {
        setMessage(err.response.data)
      });
    }
  };  

  useEffect(() => {
    StudentService.renderMyHomePage()
    .then(({data}) => {
      const groups = [];
      (data.groups).map((group) => {
        const options = [];
        (group.credentials).map((credential) => {
          options.push({value: credential._id, label: credential.name});
        })
        groups.push({label: group.name, options:options})
      })
      const allCred = [];
      (data.credentials).map((credential) => { 
        allCred.push({value:credential._id, label:credential.name})
      })
      groups.push({label:"all", options:allCred})
      setCredentialData([...credentialData, ...groups]);
    })
    .catch((err) => {
      console.log(err);
    });
    StudentService.renderProfileForm()
    .then(({ data }) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setAddress(data.address);
      setPhone(data.phone);
      setEmail(data.email);
      setDescription(data.description);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" && (
        <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Resume</Modal.Title>
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
                disable={true}
              />
              <ProfileForm 
                name={"Last Name"}
                defaultValue={currentLastName}
                disable={true}
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
            {message && (
              <div className="alert alert-warning mt-3" role="alert">
                {message}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postResume}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default NewResumeFormComponent;
