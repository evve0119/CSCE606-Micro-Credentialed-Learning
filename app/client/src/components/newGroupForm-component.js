import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const NewGroupFormComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    // If no current user go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };
    // Get user's credentials
    let [credentialData, setCredentialData] = useState(null);
    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        AuthService.renderAllCredentials(_id)
            .then(({ data }) => {
                setCredentialData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [message, setMessage] = useState(null);
    // Set new group name
    let [groupName, setGroupName] = useState(null);

    // Handle new group name
    const handleChangeGroupName = (e) => {
        setGroupName(e.target.value);
    };

    // Post new credential
    const postGroup = () => {
        AuthService.createNewGroup(groupName, addcredentials ,currentUser.user._id).then(() => {
            window.alert("New group is created!")
            history.push("/myHomePage")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }

    // Handle checked and unchecked credentials
    let [addcredentials, setAddCredentials] = useState([])
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        // Case 1 : The user checks the box
        if (checked) {
            setAddCredentials([...addcredentials, value]);
        }
        // Case 2  : The user unchecks the box
        else {
            setAddCredentials(addcredentials.filter((e)=> e !== value));
        }
      };

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
            {/* If login */}
            {currentUser && (
                <div className="form-group">
                    <h1>Add new group</h1>
                    <label for="groupName">Group name</label>
                    <input
                        name="groupName"
                        type="text"
                        className="form-control"
                        id="groupName"
                        onChange={handleChangeGroupName}
                    />
                    <br />
                    {/* All credentials */}
                    {credentialData && (credentialData.map((credential) => (
                        <div className="mb-5">
                            <input className="h3" type="checkbox" name="addcredentials" value={credential._id} onChange={handleChange}/>
                            <label className="h3" for={credential._id}>{credential.name}</label>
                        </div>
                    )))}
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