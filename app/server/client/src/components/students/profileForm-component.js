import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service";
import {Modal, Form, Button} from "react-bootstrap";

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

const ProfileFormComponent = (props) => {
  const [ currentFirstName, setFirstName ] = useState("");
  const [ currentLastName, setLastName ] = useState("");
  const [ currentAddress, setAddress ] = useState("");
  const [ currentPhone, setPhone ] = useState("");
  const [ currentEmail, setEmail ] = useState("");
  const [ currentDescription, setDescription ] = useState("");
  let [message, setMessage] = useState(null);
  const history = useHistory();

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

  const handleClose = e => {
    history.push("/student/home");
  };

  useEffect(() => {
    StudentService.renderProfileForm()
    .then(({ data }) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setAddress(data.address);
      setPhone(data.phone);
      setEmail(data.email)
      setDescription(data.description);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const updateProfile = () => {
    if(currentFirstName === ""){
      setMessage("First name is not allowed to be empty!");
    }
    else if(currentLastName === ""){
      setMessage("Last name is not allowed to be empty!");
    }
    else{
      const editProfile = {
        firstName: currentFirstName,
        lastName: currentLastName,
        address: currentAddress,
        phone: currentPhone,
        email: currentEmail,
        description: currentDescription,
      };
      StudentService.updateProfile(editProfile).then(() => {
        window.alert("Profile is updated!")
        history.push("/student/home")
      }).catch((err) => {
        setMessage(err.response.data)
      });
    }
  }

  return (
    <div>
      {props.currentRole && props.currentRole === "student" && (
        <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
            <Button variant="primary" onClick={updateProfile}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}  
    </div>
  );
};

export default ProfileFormComponent;
