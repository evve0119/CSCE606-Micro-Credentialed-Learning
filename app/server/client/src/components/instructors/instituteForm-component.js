import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
    const [currentInstitute, setInstitute] = useState("");
    let [message, setMessage] = useState(null);

    const history = useHistory();

    const handleChangeInstitute = (e) => {
        setInstitute(e.target.value);
    };

    // // Get user's credentials and group info
    useEffect(() => {
        InstructorService.renderInstituteForm()
        .then(({ data }) => {
            setInstitute(data);
        })
        .catch((err) => {
            setMessage(err.response.data);
        });
    }, []);

    // Update institute
    const updateInstitute = () => {
        InstructorService.updateInstitute(currentInstitute)
        .then(() => {
            window.alert("Institute is updated!");
            history.push("/instructor/home");
        }).catch((err) => {
            setMessage(err.response.data);
        });
    }

    return (
        <div style={{ padding: "3rem" }}>
            {/* If not login*/}
            {!props.currentRole && (
            <h1>Please Login</h1>
            )}
            {/* If not instructor*/}
            {props.currentRole && props.currentRole !== "instructor" && (
            <h1>You Are Not an Instructor</h1>
            )}
            {/* If login and instructor */}
            {props.currentRole && props.currentRole === "instructor" && (
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
            )}
        </div>
    );
};

export default InstituteFormComponent;
