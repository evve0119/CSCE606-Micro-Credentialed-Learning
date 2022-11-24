import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import InstructorService from "../../services/instructor.service";

const InstructorHomePageComponent = (props) => {
  let [currentUser, setCurrentUser] = useState(null);
  //  Get current user all information from database
  useEffect(() => {
    InstructorService.renderMyHomePage()
    .then(({ data }) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // render new group form
  const history = useHistory();
  const renderNewTeachForm = () => {
    history.push("/instructor/courses/new")
  }
  const renderSendCredential = (teachId) => {
    history.push(`/instructor/courses/${teachId}/sendCredential`);
  };
  const renderCoursePage = (teachId) => {
    history.push(`/courses/${teachId}`);
  };
  const renderInstituteForm = () => {
    history.push("/instructor/intro")
  }


  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If not instructor*/}
      {props.currentRole && props.currentRole !== "instructor" && (
        <h1>You Are Not an Instructor</h1>
      )}
      {/* If login and instructor */}
      {props.currentRole && props.currentRole === "instructor" && (
        <>
        {currentUser && (
          <div>
            <h1 className="mb-3">My home page</h1>
            <header className="">
              <h3>
                Name: {currentUser.username}
              </h3>
              <h3>
                Email: {currentUser.email}
              </h3>
              <h3>
                Institute: {currentUser.institute}
              </h3>
            </header>
            <button id="editInstitute" className="btn btn-primary" onClick={renderInstituteForm}>
              Edit
            </button>
          </div>
        )}
        {/* Show all courses (if login) */}
        {currentUser && (
          <div>
            <h3 className="mt-5 mb-3">Courses &emsp;
              <button id="addNewCourse" className="btn btn-primary" onClick={renderNewTeachForm}>
                Add new course
              </button>
            </h3>
            <div>
              {currentUser.teach.map((teach) => (
                <div key={teach._id} className="mb-3">
                  <Link className="text-primary h3" to={`courses/${teach._id}/edit`}>{teach.name}</Link> &emsp;&emsp;
                  <button className="btn btn-warning" onClick={() => renderCoursePage(teach._id)} >View course</button> &emsp;&emsp;
                  <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button>
                </div>
              ))}
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default InstructorHomePageComponent;