import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "../style.css";
// import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

const StudentRegisterComponent = (props) => {
  const history = useHistory();
  if(props.currentRole){
    history.replace(`/${props.currentRole}/home`);
  }
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student");
  let [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleRegister = () => {
    if (firstname === "" || lastname === "") {
      setMessage("Please enter first name and last name")
    }
    else {
      AuthService.register(username, email, password, role, firstname, lastname)
        .then(() => {
          window.alert(
            "Registration succeeds. Please verify your email before login!"
          );
          // redirect to the other page
          history.push({
            pathname: "/",
            state: { role: role }
          })
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="register">
      <div className="screen-1">
        <center><span className="logo">Student Registration Portal</span></center>
        {message && <div className="alert alert-danger">{message}</div>}
        <br />
        <div className="username">
          <label htmlFor="username">Username</label>
          <div className="sec-2">
            <ion-icon name="person-circle-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeUsername}
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
        </div>
        <br />
        <div className="firstname">
          <label htmlFor="firstname">First name</label>
          <div className="sec-2">
            <ion-icon name="person-circle-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeFirstname}
              type="text"
              name="firstname"
              placeholder="firstname"
            />
          </div>
        </div>
        <br />
        <div className="lastname">
          <label htmlFor="lastname">Last name</label>
          <div className="sec-2">
            <ion-icon name="person-circle-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeLastname}
              type="text"
              name="lastname"
              placeholder="lastname"
            />
          </div>
        </div>
        <br />
        <div className="email">
          <label htmlFor="email">Email</label>
          <div className="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangeEmail}
              type="text"
              name="email"
              placeholder="username@email.com"
            />
          </div>
        </div>
        <br />
        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            &nbsp;
            <input
              onChange={handleChangePassword}
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder=".........."
            />
            <ion-icon onClick={togglePassword} name={passwordShown ? "eye-outline" : "eye-off-outline"}></ion-icon>
          </div>
        </div>
        <br />
        <button className="registerButton" id="register" onClick={handleRegister}>Register</button>
        <br />
        <br />
        <div class="footer">
          <a href="/login/student">Login</a>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterComponent;
