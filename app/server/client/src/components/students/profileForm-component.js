import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import StudentService from "../../services/student.service";

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

const ProfileFormComponent = (props) => {
    const { currentUser, setCurrentUser }  = props;
    const [ currentFirstName, setFirstName ] = useState("");
    const [ currentLastName, setLastName ] = useState("");
    const [ currentAddress, setAddress ] = useState("");
    const [ currentPhone, setPhone ] = useState("");
    const [ currentEmail, setEmail ] = useState("");
    const [ currentDescription, setDescription ] = useState("");
    let [message, setMessage] = useState(null);

    // If not holder go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
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

    // // Get user's credentials and group info
    let [studentProfile, setStudentProfile] = useState(null)
    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        StudentService.renderProfileForm(_id)
        .then(({ data }) => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAddress(data.address);
            setPhone(data.phone);
            setEmail(data.email)
            setDescription(data.description);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // Update profile
    const updateProfile = () => {
        const editProfile = {
            firstName: currentFirstName,
            lastName: currentLastName,
            address: currentAddress,
            phone: currentPhone,
            email: currentEmail,
            description: currentDescription,
        };
        StudentService.updateProfile(currentUser.user._id, editProfile).then(() => {
            window.alert("Profile is updated!")
            history.push("/student/home")
        }).catch((err) => {
            setMessage(err.response.data)
        });
    }

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
                <h1>Edit Profile</h1>
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
                <br />
                <button id="submit" className="btn btn-primary" onClick={updateProfile}>Submit</button>
                <br />
                {message && (
                    <div className="alert alert-warning mt-3" role="alert">
                        {message}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default ProfileFormComponent;
