import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

const NewResumeFormComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const [message, setMessage] = useState(null);
    const [ resumeName, setResumeName] = useState(null);
    const [ currentFirstName, setFirstName ] = useState("");
    const [ currentLastName, setLastName ] = useState("");
    const [ currentAddress, setAddress ] = useState("");
    const [ currentPhone, setPhone ] = useState("");
    const [ currentEmail, setEmail ] = useState("");
    const [ currentDescription, setDescription ] = useState("");
    const [ credentialData, setCredentialData ] = useState([]);
    const [ addCredentials, setAddCredentials ] = useState([]);
    // If no current user go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };
    
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
    const postResume = () => {
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
        StudentService.createNewResume(resumeName, addProfile, addCred, currentUser.user._id)
        .then(() => {
            window.alert("New resume is created!")
            history.push("/student/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    };  

    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        StudentService.renderMyHomePage(_id)
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
        StudentService.renderProfileForm(_id)
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
        <div style={{ padding: "3rem" }}>
            {/* If not login */}
            {!currentUser && (
                <div>
                    <p>You must login before seeing your credentials.</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        Take me to login page
                    </button>
                </div>
            )}
            {/* If not student */}
            {(currentUser.user.role != "student") && (
                <div>
                    <p>You are not authorized</p>
                </div>
            )}
            {/* If login and student */}
            {currentUser && (currentUser.user.role == "student") &&(
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
                    <h1>Add New Resume</h1>
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
                    <button className="btn btn-primary" onClick={postResume}>Add</button>
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

export default NewResumeFormComponent;