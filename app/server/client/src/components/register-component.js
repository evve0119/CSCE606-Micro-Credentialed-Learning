import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import Select from 'react-select';

const RegisterComponent = () => {
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  const roles = [
    {value: "student", label: "student"},
    {value: "instructor", label: "instructor"}
  ];
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.label);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. Please verify your email before login!"
        );
        // redirect to the other page
        history.push({
          pathname: "/login",
          state: {role: role}
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
        <div>
          <label htmlFor="username">Username</label>
          <input onChange={handleChangeUsername} type="text" className="form-control" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={handleChangeEmail} type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={handleChangePassword} type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role</label>
          <Select
            options={roles}
            onChange={handleChangeRole}
            defaultValue={roles.find(r => {
              return r.value === role
            })}
          />
        </div>
        <br />
        <button id="register" onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
