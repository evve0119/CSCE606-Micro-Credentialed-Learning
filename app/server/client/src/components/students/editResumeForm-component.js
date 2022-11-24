import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';

const ProfileForm = (props) => {
  return(
    <><label htmlFor={props.name}>{props.name}</label>
    <input
      name={props.name}
      type="text"
      className="form-control mt-2"
      id={props.name}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    /></>
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
          <h1>Edit {resumeName}</h1>
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
          <p><label htmlFor="description">Description</label></p>
          <textarea id="description" rows="4" cols="50"
            value={currentDescription} onChange={handleChangeDescription} />
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
          <button id="update" className="btn btn-primary" onClick={updateResume} >Update</button> <button id="delete" className="btn btn-danger" onClick={deleteResume} >Delete</button>
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

export default EditResumeFormComponent;