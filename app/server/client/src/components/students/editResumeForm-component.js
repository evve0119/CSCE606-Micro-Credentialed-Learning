import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service"

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
    let { currentUser, setCurrentUser } = props;
    const resume_id = useParams()._id;
    let _id = ""
    if (currentUser) {
        _id = currentUser.user._id;
    }
    const [ message, setMessage ] = useState(null);
    const [ resumeName, setResumeName] = useState("");
    const [ currentFirstName, setFirstName ] = useState("");
    const [ currentLastName, setLastName ] = useState("");
    const [ currentAddress, setAddress ] = useState("");
    const [ currentPhone, setPhone ] = useState("");
    const [ currentEmail, setEmail ] = useState("");
    const [ currentDescription, setDescription ] = useState("");
    const [ addCredentials, setAddCredentials ] = useState([]);
    const [ addCredentialsName, setAddCredentialsName ] = useState([]);
    const [ credentialData, setCredentialData ] = useState(null);
    const [ showCredentials, setShowCredentials ] = useState("");
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

    const updateResume = () => {
        const addProfile = {
            firstName: currentFirstName,
            lastName: currentLastName,
            address: currentAddress,
            phone: currentPhone,
            email: currentEmail,
            description: currentDescription,
        };
        StudentService.updateResume(resumeName, addProfile, addCredentials, addCredentialsName, _id, resume_id)
        .then(() => {
            window.alert("The resume is updated!")
            history.push("/student/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    };  

    const handleChange = (e) => {
        // Destructuring
        const { value, checked, name } = e.target;
        // Case 1 : The user checks the box
        if (checked) {
            setAddCredentials([...addCredentials, value]);
            setAddCredentialsName([...addCredentialsName, name]);
            setShowCredentials(showCredentials+name+" | ");
        }
        // Case 2  : The user unchecks the box
        else {
            setAddCredentials(addCredentials.filter((e)=> e !== value));
            setAddCredentialsName(addCredentialsName.filter((e) => e !== name));
            setShowCredentials(showCredentials.replace(name+" | ", ""));
        }
    };

    useEffect(() => {
        StudentService.renderAllCredentials(_id)
        .then(({ data }) => {
            setCredentialData(data);
        })
        .catch((err) => {
            console.log(err);
        });
        StudentService.renderResumeForm(_id, resume_id)
        .then(({ data }) => {
            setResumeName(data.name);
            setFirstName(data.profile.firstName);
            setLastName(data.profile.lastName);
            setAddress(data.profile.address);
            setPhone(data.profile.phone);
            setEmail(data.profile.email);
            setDescription(data.profile.description);
            setAddCredentials([...addCredentials, ...data.credentials]);
            setAddCredentialsName([...addCredentialsName, ...data.credentialsName]);
            let show = ""
            data.credentialsName.map((name) => {
                show = show+name+" | ";
            });
            setShowCredentials(showCredentials+show);
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
                    <ProfileForm 
                        name={"Description"}
                        defaultValue={currentDescription}
                        onChange={handleChangeDescription}
                    />
                    <ProfileForm 
                        name={"Credentials"}
                        defaultValue={showCredentials}
                    />
                    {/* All credentials */}
                    {credentialData && (credentialData.map((credential) => (
                        <li key={credential._id}>
                            {(addCredentials.includes(credential._id)) &&
                                <>
                                    <input className="h5" type="checkbox" name={credential.name} value={credential._id} onChange={handleChange} defaultChecked />
                                    <label className="h5" htmlFor={credential._id}>{credential.name}</label>
                                </>
                            }
                            {!(addCredentials.includes(credential._id)) &&
                                <>
                                    <input className="h5" type="checkbox" name={credential.name} value={credential._id} onChange={handleChange} />
                                    <label className="h5" htmlFor={credential._id}>{credential.name}</label>
                                </>
                            }
                        </li>
                    )))}
                    <div>
                    <button className="btn btn-primary" onClick={updateResume}>Submit</button>
                    </div>
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