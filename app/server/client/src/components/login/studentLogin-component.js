import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../../services/auth.service";
import { useLocation } from "react-router-dom";
import "../style.css";
// import "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"

const StudentLoginComponent = (props) => {
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const location = useLocation();
  let [role, setRole] = useState("student");
  let [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
        props.setCurrentRole(AuthService.getCurrentRole());
        history.push("/student/home");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };


  return (
    <div style={{ padding: "3rem" }} className="login">
      	<div className="screen-1">
		  	{message && ( <div className="alert alert-danger" role="alert">{message}</div>)}
        	<center><span className="logo">Student Login Portal</span></center>
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
			<button className="loginButton" id="login" onClick={handleLogin}>Login</button>
			<br />
			<br />
			<div class="footer">
				<a href="/register/student">Register</a>
				<a href="/forgot">Forgot your password?</a>
			</div>
		</div>
    </div>
  );
};

export default StudentLoginComponent;
