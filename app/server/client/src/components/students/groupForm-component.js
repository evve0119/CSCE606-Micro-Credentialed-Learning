import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service";
import Select from 'react-select';

const GroupFormComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const group_id = useParams()._id;
    let [message, setMessage] = useState(null);
    let [newGroupName, setNewGroupName] = useState(" ");
    let [currentGroup, setCurrentGroup] = useState(null);
    let [credentialData, setCredentialData] = useState(null);
    let [editCredentials, setEditCredentials] = useState([]);

    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    }; 
    
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
        StudentService.updateGroup(currentUser.user._id, editCred, currentGroup._id, newGroupName).then(() => {
            window.alert("Group is updated!")
            history.push("/student/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    };

    const deleteGroup = () => {
        StudentService.deleteGroup(currentUser.user._id, currentGroup._id)
        .then(() => {
            window.alert("Group is deleted!")
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
        StudentService.renderGroupForm(_id, group_id)
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
            {/* If not holder */}
            {!currentUser && (
                <div>
                    <p>You don't have the permission</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        Take me to login page
                    </button>
                </div>
            )}
            {/* If holder */}
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
        </div>
    );
};

export default GroupFormComponent;
