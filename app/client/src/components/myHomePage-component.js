import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const MyHomePageComponent = () => {
  let [ currentUser, setCurrentUser ] = useState(null);
  //  Get current user all information from database
  useEffect(()=>{
    AuthService.renderMyHomePage(AuthService.getCurrentUser().user._id)
    .then(({data}) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  // render new group form
  const history = useHistory();
  const renderNewGroupForm = ()=>{
    history.push("/newGroupForm")
  }

  // render edit group form
  const renderGroupForm = () =>{
    history.push("/GroupForm")
  }

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login */}
      {!currentUser && (
        <div>You must login first before viewing your home page.</div>
      )}
      {/* If login */}
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
          <button className="btn btn-primary" onClick={renderNewGroupForm}>
            Add new group
          </button>
        </div>
      )}
      {/* Add new groups (if login) */}
      
    </div>
  );
};

export default MyHomePageComponent;
