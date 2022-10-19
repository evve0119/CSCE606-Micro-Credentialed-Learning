import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
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
    AuthService.renderAllCredentials(_id)
    .then(({data}) => {
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
  const postCredential = ()=>{
    AuthService.addCredential(credentialName,currentUser.user._id).then((response)=>{
      window.alert("New credential is created, refresh to see all credentials")
      history.push("/allCredentials")
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
          <h1 class="mt-5">Here are your credentials</h1>
          {credentialData.map((credential) => (
            <div >
                <h5 className="card-title">{credential.name}</h5>
                <br />
            </div>
          ))}
        </div>
      )}
    {/* If is instructor */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <h1>Add new credential</h1>
          <label for="credentialName">Credential name</label>
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
    {/* If is student */}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>Welcome to student's Credentials page.</h1>
        </div>
      )}
    </div>
  );
};

export default CredentialComponent;
