import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InstructorService from "../../services/instructor.service";

const InstituteForm = (props) => {
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
    const { currentUser, setCurrentUser } = props;
    const [currentInstitute, setInstitute] = useState("");
    let [message, setMessage] = useState(null);

    // If not holder go to login
    const history = useHistory();
    const handleTakeToLogin = () => {
        history.push("/login");
    };

    const handleChangeInstitute = (e) => {
        setInstitute(e.target.value);
    };

    // // Get user's credentials and group info
    useEffect(() => {
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }
        InstructorService.renderInstituteForm(_id)
            .then(({ data }) => {
                setInstitute(data);
            })
            .catch((err) => {
                setMessage(err.response.data);
            });
    }, []);

    // Update institute
    const updateInstitute = () => {
        InstructorService.updateInstitute(currentUser.user._id, currentInstitute).then(() => {
            window.alert("Institute is updated!");
            history.push("/instructor/home");
        }).catch((err) => {
            setMessage(err.response.data);
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
                <h1>Edit institute</h1>
                <InstituteForm
                    name={"Institute"}
                    defaultValue={currentInstitute}
                    onChange={handleChangeInstitute}
                />
                <button id="submit" className="btn btn-primary" onClick={updateInstitute}>Submit</button>
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

export default InstituteFormComponent;
