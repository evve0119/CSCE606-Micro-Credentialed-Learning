import React from "react";
import { Link,  useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleLogin = () => {
    history.push({
    pathname: "/login",
    state: {role: ""}
    })
  };
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout Successfully, now you are redirected to the homepage.");
    setCurrentUser(null);
    history.push("/");
  };
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {/* root not login */}
                {!currentUser && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Micro-Credentials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link onClick={handleLogin} className="nav-link">
                        Login
                      </Link>
                    </li>
                  </>
                )}
                {/* all role after login */}
                {currentUser && (
                  <>
                    <li className="nav-item">
                      <Link onClick={handleLogout} className="nav-link" to="#">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
                {/* student */}
                {currentUser && (currentUser.user.role == "student") &&(
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/home">
                        My Home Page
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/credentials">
                        Credential
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/jobs">
                        Jobs
                      </Link>
                    </li>
                  </>
                )}
                {/* instructor */}
                {currentUser && (currentUser.user.role == "instructor") &&(
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/instructor/home">
                        My Home Page
                      </Link>
                    </li>
                  </>
                )}
                {/* instructor */}
                {currentUser && (currentUser.user.role == "recruiter") &&(
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recruiter/home">
                        My Home Page
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
