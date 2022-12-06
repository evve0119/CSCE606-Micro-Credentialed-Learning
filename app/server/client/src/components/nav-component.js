import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./style.css"
const NavComponent = (props) => {
  let { currentRole, setCurrentRole } = props;
  const history = useHistory();
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout Successfully, now you are redirected to the homepage.");
    setCurrentRole(null);
    history.push("/");
  };
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-sm nav-bg">
          <div className="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon">
                <i class="fas fa-bars" style={{color:"#fff"}}></i>
              </span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
              <ul className="navbar-nav">
                {!currentRole && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Micro-Credentials
                    </Link>
                  </li>
                )}
                {/* student */}
                {currentRole && (currentRole === "student") && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/home">
                        Micro-Credentials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/home">
                        Home
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
                {currentRole && (currentRole === "instructor") && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/instructor/home">
                        Micro-Credentials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/instructor/home">
                        Home
                      </Link>
                    </li>
                  </>
                )}
                {/* instructor */}
                {currentRole && (currentRole === "recruiter") && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recruiter/home">
                        Micro-Credentials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recruiter/home">
                        Home
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {/* all role after login */}
              {currentRole && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="#">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
