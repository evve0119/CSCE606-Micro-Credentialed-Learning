import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service";
import Select from 'react-select';

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
        <>
        {currentGroup && (
          <div 
            className="form-group"
            style={{
              position: "absolute",
              background: "#fff",
              top: "10%",
              left: "10%",
              right: "10%",
              padding: 15,
              border: "2px solid #444"
            }}
          >
            <h1>Edit {currentGroup.name}</h1>
            <label htmlFor="groupName">Name</label>
            <input
              name="groupName"
              type="text"
              className="form-control mt-2"
              id="groupName"
              defaultValue={currentGroup.name}
              onChange={handleChangeGroupName}
            />
            <br />
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
            <br />
            <button id="update" className="btn btn-primary" onClick={updateGroup} >Update</button> <button id="delete" className="btn btn-danger" onClick={deleteGroup} >Delete</button>
            <br />
            {message && (
              <div className="alert alert-warning mt-3" role="alert">
                {message}
              </div>
            )}
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default GroupFormComponent;
