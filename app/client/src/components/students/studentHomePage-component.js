import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service";

const StudentHomePageComponent = () => {
  let [currentUser, setCurrentUser] = useState(null);
  //  Get current user all information from database
  useEffect(() => {
    StudentService.renderMyHomePage(AuthService.getCurrentUser().user._id)
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // render new group form
  const history = useHistory();
  const renderNewGroupForm = () => {
    history.push("/newGroupForm")
  }

  return (
    <div style={{ padding: "3rem" }}>
      {(console.log("return", currentUser))}
      {/* If not login */}
      {!currentUser && (
        <div>You are not authorized</div>
      )}
      {/* If login and student */}
      {currentUser && (
        <div>
          <h1 className="mb-3">My home page</h1>
          <header className="">
            <h3>
              Name: {currentUser.username}
            </h3>
          </header>
          <h3>
            Email: {currentUser.email}
          </h3>
        </div>
      )}
      {/* Show all groups (if login) */}
      {currentUser && (
        <div>
          <h3 className="mt-5 mb-3">Groups</h3>
          <div>
            {currentUser.groups.map((group) => (
              <div className="mb-3">
                <Link className="text-primary" to={`groupForm/${group._id}`}>{group.name}</Link>
                {group.credentials.map((credential) => (<h5>{credential.name}</h5>))}
              </div>
            ))}
          </div>
          {/* Add new groups (if login) */}
          <button className="btn btn-primary" onClick={renderNewGroupForm}>
            Add new group
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentHomePageComponent;
