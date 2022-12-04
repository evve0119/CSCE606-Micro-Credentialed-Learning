import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";

const InstructorRegisterComponent = () => {
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("instructor");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration succeeds. Please verify your email before login!"
        );
        // redirect to the other page
        history.push({
          pathname: "/",
          state: {role: role}
        })
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="register">
        <div className="screen-1">
            {message && <div className="alert alert-danger">{message}</div>}
            <center><span className="logo">Instructor Registration Portal</span></center>
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
                        type="password" 
                        name="password"
                        placeholder="........." 
                    />
                </div>
             </div>
            <br />
            <button className="registerButton" id="register" onClick={handleRegister}>Register</button>
            <br />
            <br />
            <div class="footer">
                <a href="/login/instructor">Login</a>
            </div>
        </div>
    </div>
);
};

export default InstructorRegisterComponent;
