import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/student.service";
// import CredentialService from "../services/credential.service";

const CredentialComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  // If no current user go to login
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };

  let [message, setMessage] = useState(null);

  // Set new credential name
  let [credentialName, setCredentialName] = useState(null);

  // Get user's credentials immediately
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

  // Handle new credential name
  const handleChangeCredentialName = (e) => {
    setCredentialName(e.target.value);
  };

  // Post new credential
  const postCredential = () => {
    StudentService.addCredential(credentialName, currentUser.user._id).then((response) => {
      window.alert("New credential is created, refresh to see all credentials")
      history.push("/student/credentials")
    }).catch((err) => {
      setMessage(err.response.data)
    });
  }

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
      {/* If this person has credential, show all credentials */}
      {currentUser && credentialData && credentialData.length != 0 && (
        <div>
          <h3>Credentials</h3>
          {credentialData.map((credential) => (
            <li key={credential._id}>{credential.name}</li>
          ))}
        </div>
      )}
      {/* If is instructor */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <h1>Add new credential</h1>
          <label htmlFor="credentialName">Credential name</label>
          <input
            name="credentialName"
            type="text"
            className="form-control"
            id="credentialName"
            onChange={handleChangeCredentialName}
          />
          <br />
          <button className="btn btn-primary" onClick={postCredential}>
            Add
          </button>
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

export default CredentialComponent;
