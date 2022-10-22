import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import InstructorService from "../../services/instructor.service";

const InstructorHomePageComponent = () => {
    let [ currentUser, setCurrentUser ] = useState(null);
    //  Get current user all information from database
    useEffect(()=>{
      InstructorService.renderMyHomePage(AuthService.getCurrentUser().user._id)
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    },[]);
  
    // render new group form
    const history = useHistory();
    const renderNewTeachForm = ()=>{
      history.push("/newTeachForm")
    }
    const renderSendCredential = (teachId) => { 
      history.push("/sendCredential/"+teachId);
    };
  
    return (
      <div style={{ padding: "3rem" }}>
        {/* If not login */}
        {!currentUser && (
          <div>You are not authorized.</div>
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
            <h3 className="mt-5 mb-3">Courses</h3>
            <div>
            {currentUser.teach.map((teach) => (
              <div className="mb-3">
                  <Link className="text-primary h3" to={`groupForm/${teach._id}`}>{teach.name}</Link> <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button>
              </div>
            ))}
          </div>
            <button id="addNewCourse" className="btn btn-primary" onClick={renderNewTeachForm}>
              Add new course
            </button>
          </div>
        )}
        {/* Add new groups (if login) */}
        
      </div>
    );
  };
  
  export default InstructorHomePageComponent;