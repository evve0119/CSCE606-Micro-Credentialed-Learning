import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service"

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
        StudentService.renderAllCredentials(_id)
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
        StudentService.createNewGroup(groupName, addcredentials ,currentUser.user._id).then(() => {
            window.alert("New group is created!")
            history.push("/student/home")
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
                    {/* All credentials */}
                    {credentialData && (credentialData.map((credential) => (
                        <div key={credential._id} className="mb-5">
                            <input className="h3" type="checkbox" name="addcredentials" value={credential._id} onChange={handleChange}/>
                            <label className="h3" htmlFor={credential._id}>{credential.name}</label>
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
