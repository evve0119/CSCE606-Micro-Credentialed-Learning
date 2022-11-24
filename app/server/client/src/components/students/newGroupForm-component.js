import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';

const NewGroupFormComponent = (props) => {
  const [message, setMessage] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [credentialData, setCredentialData] = useState(null);
  const [addCredentials, setAddCredentials] = useState([])
  const history = useHistory();
  
  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleChange = (value) => {
    setAddCredentials(value);
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
      setMessage(err.response.data)
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
      {props.currentRole && props.currentRole === "student" &&(
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
          <h1>Add New Group</h1>
          <label htmlFor="groupName">Group name</label>
          <input
            name="groupName"
            type="text"
            className="form-control"
            id="groupName"
            onChange={handleChangeGroupName}
          />
          <br />
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
          <br />
          <button className="btn btn-primary" onClick={postGroup}>Add</button>
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

export default NewGroupFormComponent;
