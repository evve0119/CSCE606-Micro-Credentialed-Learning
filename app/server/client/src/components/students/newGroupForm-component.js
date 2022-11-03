import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service"
import Select from 'react-select';

const NewGroupFormComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const [message, setMessage] = useState(null);
    const [groupName, setGroupName] = useState(null);
    const [credentialData, setCredentialData] = useState(null);
    const [addCredentials, setAddCredentials] = useState([])
    // If no current user go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };
    
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
        StudentService.createNewGroup(groupName, addCred, currentUser.user._id).then(() => {
            window.alert("New group is created!")
            history.push("/student/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }
    
    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        StudentService.renderAllCredentials(_id)
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
