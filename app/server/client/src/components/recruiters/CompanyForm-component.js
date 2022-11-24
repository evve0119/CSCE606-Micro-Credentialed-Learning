import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RecruiterService from "../../services/recruiter.service";

const CompanyForm = (props) => {
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

const CompanyFormComponent = (props) => {
    const [currentCompany, setCompany] = useState("");
    let [message, setMessage] = useState(null);

    const history = useHistory();

    const handleChangeCompany = (e) => {
        setCompany(e.target.value);
    };

    // // Get user's credentials and group info
    useEffect(() => {
        RecruiterService.renderCompanyForm()
            .then(({ data }) => {
                setCompany(data);
            })
            .catch((err) => {
                setMessage(err.response.data);
            });
    }, []);

    // Update company
    const updateCompany = () => {
        RecruiterService.updateCompany(currentCompany).then(() => {
            window.alert("Company is updated!");
            history.push("/recruiter/home");
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
            {/* If not recruiter*/}
            {props.currentRole && props.currentRole !== "recruiter" && (
                <h1>You Are Not a Recruiter</h1>
            )}
            {/* If login and recruiter */}
            {props.currentRole && props.currentRole === "recruiter" && (
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
                    <h1>Edit company</h1>
                    <CompanyForm
                        name={"Company"}
                        defaultValue={currentCompany}
                        onChange={handleChangeCompany}
                    />
                    <button id="submit" className="btn btn-primary" onClick={updateCompany}>Submit</button>
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

export default CompanyFormComponent;
