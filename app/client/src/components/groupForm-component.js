import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthService from "../services/auth.service";

const GroupFormComponent = (props) => {
    // If not holder go to login

    let { currentUser, setCurrentUser } = props;
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };

    // // get group_id from url
    const group_id = useParams()._id;

    // // Get user's credentials and group info
    let [currentGroup, setCurrentGroup] = useState(null)
    let [credentialData, setCredentialData] = useState(null);
    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        AuthService.renderGroupForm(_id, group_id)
            .then(({ data }) => {
                setCurrentGroup(data);
            })
            .catch((err) => {
                console.log(err);
            });
        AuthService.renderAllCredentials(_id)
            .then(({ data }) => {
                setCredentialData(data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    let [message, setMessage] = useState(null);

    // // Handle new group name
    let [newGroupName, setNewGroupName] = useState(null);
    const handleChangeGroupName = (e) => {
        setNewGroupName(e.target.value);
    };

    // Update group
    const updateGroup = () => {
        AuthService.updateGroup(currentUser.user._id, editcredentials, currentGroup._id, newGroupName).then(() => {
            window.alert("Group is updated!")
            history.push("/myHomePage")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }
    // // Handle checked and unchecked credentials
    let [editcredentials, setEditCredentials] = useState([])
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        // Case 1 : The user checks the box
        if (checked) {
            setEditCredentials([...editcredentials, value]);
        }
        // Case 2  : The user unchecks the box
        else {
            setEditCredentials(editcredentials.filter((e) => e !== value));
        }
    };


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
                <div className="form-group">
                    <h1>Edit group {currentGroup.name}</h1>
                    <label for="groupName">Name</label>
                    <input
                        name="groupName"
                        type="text"
                        className="form-control mt-2"
                        id="groupName"
                        defaultValue={currentGroup.name}
                        onChange={handleChangeGroupName}
                    />
                    <br />
                    {/* All credentials */}

                    {credentialData && (credentialData.map((credential) => (
                        <div className="mb-5">
                            {(currentGroup.credentials.includes(credential._id)) &&
                                <div>
                                    <input className="h3" type="checkbox" name="addcredentials" value={credential._id} onChange={handleChange} checked />
                                    <label className="h3" for={credential._id}>{credential.name}</label>
                                </div>
                            }
                             {!(currentGroup.credentials.includes(credential._id)) &&
                                <div>
                                    <input className="h3" type="checkbox" name="addcredentials" value={credential._id} onChange={handleChange} />
                                    <label className="h3" for={credential._id}>{credential.name}</label>
                                </div>
                            }
                        </div>
                    )))}
                    <button className="btn btn-primary" onClick={updateGroup}>Add</button>
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
