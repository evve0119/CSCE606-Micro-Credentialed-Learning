import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InstructorService from "../../services/instructor.service";
import { Modal, Form, Button } from "react-bootstrap";

const ProfileForm = (props) => {
    return (
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

const InstituteFormComponent = (props) => {
    const [currentFirstName, setFirstName] = useState("");
    const [currentLastName, setLastName] = useState("");
    const [currentAddress, setAddress] = useState("");
    const [currentPhone, setPhone] = useState("");
    const [currentEmail, setEmail] = useState("");
    const [currentDescription, setDescription] = useState("");
    const [currentInstitute, setInstitute] = useState("");
    let [message, setMessage] = useState(null);

    const history = useHistory();

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
    const handleChangeInstitute = (e) => {
        setInstitute(e.target.value);
    };
    const handleClose = e => {
        history.push("/instructor/home");
    };

    useEffect(() => {
        InstructorService.renderProfileForm()
            .then(({ data }) => {
                setFirstName(data.profile.firstName);
                setLastName(data.profile.lastName);
                setAddress(data.profile.address);
                setPhone(data.profile.phone);
                setEmail(data.profile.email)
                setDescription(data.profile.description);
                setInstitute(data.institute);
            })
            .catch((err) => {
                setMessage(err.response.data);
            });
    }, []);

    // Update profile
    const updateProfile = () => {
        if (currentFirstName === "") {
            setMessage("First name is not allowed to be empty!");
        }
        else if (currentLastName === "") {
            setMessage("Last name is not allowed to be empty!");
        }
        else {
            const editProfile = {
                firstName: currentFirstName,
                lastName: currentLastName,
                address: currentAddress,
                phone: currentPhone,
                email: currentEmail,
                description: currentDescription,
            };
            InstructorService.updateProfile(editProfile, currentInstitute).then(() => {
                window.alert("Profile is updated!")
                history.push("/instructor/home")
            }).catch((err) => {
                setMessage(err.response.data)
            });
        }
    }

    return (
        <div style={{ padding: "3rem" }}>
            {/* If not login*/}
            {!props.currentRole && (
                <h1>Please Login</h1>
            )}
            {/* If not instructor*/}
            {props.currentRole && props.currentRole !== "instructor" && (
                <h1>You Are Not a Instructor</h1>
            )}
            {/* If login and instructor */}
            {props.currentRole && props.currentRole === "instructor" && (
                <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
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
                                name={"Institute"}
                                defaultValue={currentInstitute}
                                onChange={handleChangeInstitute}
                            />
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    value={currentDescription}
                                    onChange={handleChangeDescription}
                                />
                            </Form.Group>
                        </Form>
                        {message && (
                            <div className="alert alert-warning mt-3" role="alert">
                                {message}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateProfile}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default InstituteFormComponent;
