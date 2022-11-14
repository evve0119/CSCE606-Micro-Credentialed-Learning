import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../services/auth.service";
import Select from 'react-select';
import { useLocation } from "react-router-dom";

const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const location = useLocation();
  let [role, setRole] = useState(location.state ? location.state.role : "");
  let [message, setMessage] = useState("");
  const roles = [
    {value: "student", label: "student"},
    {value: "instructor", label: "instructor"},
    {value: "recruiter", label: "recruiter"}
  ];
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.label);
    //setRole(e.target.value);
  };

  const handleLogin = () => {
    AuthService.login(email, password, role)
      .then((response) => {

        /// jwt in local storage
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert(
          "Login successfully, you are now redirected to the profile page."
        );
        setCurrentUser(AuthService.getCurrentUser());
        if(role == "student"){
          history.push("/student/home");
        };
        if(role == "instructor"){
          history.push("/instructor/home");
        };
        if(role == "recruiter"){
          history.push("/recruiter/home");
        };
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };


  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <Select
            options={roles}
            onChange={handleChangeRole}
            defaultValue={roles.find(r => {
              return r.value === role
            })}
          />
        </div>
        <br />
        <div class="form-group d-flex justify-content-between">
          <div>
            <button id="login" onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
            </button>
          </div>
          <div>
            <a href="/forgot">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
