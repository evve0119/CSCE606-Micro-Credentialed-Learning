import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';
import {Modal, Form, Button} from "react-bootstrap";

const NewGroupFormComponent = (props) => {
  const [message, setMessage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [credentialData, setCredentialData] = useState(null);
  const [addCredentials, setAddCredentials] = useState([])
  const history = useHistory();
  
  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleChange = (value) => {
    setAddCredentials(value);
  };

  const handleClose = e => {
    history.push("/student/home");
  };

  const postGroup = () => {
    const addCred = [];
    addCredentials.map((credential) => {
      addCred.push(credential.value);
    });
    StudentService.createNewGroup(groupName, addCred).then(() => {
      window.alert("New group is created!")
      history.push("/student/home")
    }).catch((err) => {
      setMessage(err.response.data);
    });
  }
  
  useEffect(() => {
    StudentService.renderAllCredentials()
    .then(({ data }) => {
      const options = [];
      data.map((credential) => {
        options.push({value:credential._id, label:credential.name})
      });
      setCredentialData(options);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" &&(
        <Modal show={true} centered backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="groupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  type="groupName"
                  onChange={handleChangeGroupName}
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
            <Button variant="primary" onClick={postGroup}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default NewGroupFormComponent;
