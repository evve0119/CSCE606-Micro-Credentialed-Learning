import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service";
import Select from 'react-select';
import {Modal, Form, Button} from "react-bootstrap";

const GroupFormComponent = (props) => {
  const groupId = useParams().groupId;
  let [message, setMessage] = useState(null);
  let [newGroupName, setNewGroupName] = useState("");
  let [currentGroup, setCurrentGroup] = useState(null);
  let [credentialData, setCredentialData] = useState(null);
  let [editCredentials, setEditCredentials] = useState([]);
  const history = useHistory(); 
  
  const handleChangeGroupName = (e) => {
    setNewGroupName(e.target.value);
  };
  const handleChange = (value) => {
    setEditCredentials(value);
  };

  const handleClose = e => {
    history.push("/student/home");
  };

  // Update group
  const updateGroup = () => {
    const editCred = [];
    editCredentials.map((credential) => {
      editCred.push(credential.value);
    });
    StudentService.updateGroup(editCred, currentGroup._id, newGroupName).then(() => {
      window.alert("Group is updated!")
      history.push("/student/home")
    }).catch((err) => {
      setMessage(err.response.data)
    });
  };

  const deleteGroup = () => {
    StudentService.deleteGroup(currentGroup._id)
    .then(() => {
      window.alert("Group is deleted!")
      history.push("/student/home")
    }).catch((err) => {
      setMessage(err.response.data)
    });
  };

  useEffect(() => {
    StudentService.renderGroupForm(groupId)
    .then(({ data }) => {
      setCurrentGroup(data);
      setNewGroupName(data.name)
      const options = [];
      (data.credentials).map((credential) => {
        options.push({value:credential._id, label:credential.name});
      })
      setEditCredentials(options)
    })
    .catch((err) => {
      console.log(err);
    });
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
      {props.currentRole && props.currentRole === "student" && (
        <>
        {currentGroup && (
          <Modal show={true} centered backdrop="static" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="groupName">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control
                    type="groupName"
                    defaultValue={currentGroup.name}
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
                value={editCredentials}
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
              <Button variant="danger" onClick={deleteGroup}>
                Delete
              </Button>
              <Button variant="primary" onClick={updateGroup}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        </>
      )}
    </div>
  );
};

export default GroupFormComponent;
