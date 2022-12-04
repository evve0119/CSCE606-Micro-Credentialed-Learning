import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import PasswordService from "../services/password.service";

const ForgotComponent = () => {
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForgot = () => {
    PasswordService.forgot(email)
      .then(() => {
        window.alert(
          "Please check your email to reset your password!"
        );
        // redirect to the other page
        history.push({
          pathname: "/"
        })
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };


  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <h4>Please provide your email address:</h4>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={handleChangeEmail} type="text" className="form-control" name="email" />
        </div>
        <br />
        <button id="forget" onClick={handleForgot} className="btn btn-primary">
          <span>Reset Password</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotComponent;
