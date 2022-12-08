import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import InstructorService from "../../services/instructor.service";
import CourseService from "../../services/course.service";
import Accordion from 'react-bootstrap/Accordion';
import "../style.css"

const InstructorHomePageComponent = (props) => {
  let location = useLocation();
  let [currentUser, setCurrentUser] = useState(null);
  let [currentCourse, setCurrentCourse] = useState(null);
  //  Get current user all information from database
  useEffect(() => {
    InstructorService.renderMyHomePage()
    .then(({ data }) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [location]);

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
    // CourseService.renderCoursePage(teachId)
    // .then(({ data }) => {
    //   setCurrentCourse(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const renderInstituteForm = () => {
    history.push({
      pathname: "/courses/intro",
      state: { background: location }
    })
  };

  const renderProfileForm = () => {
    history.push({
      pathname: "/instructor/intro",
      state: { background: location }
    })
  };

  const renderEditCourse = (teachId) => {
    history.push(`courses/${teachId}/edit`);
  }


  return (
    <div>
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
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-3 profile-bg">
                    <div className="phone-profile-bg">
                    <Profile
                      currentUser={currentUser}
                      renderProfileForm={renderProfileForm}
                      renderInstituteForm = {renderInstituteForm}
                    />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card-bg">
                      <Course
                        currentUser={currentUser}
                        renderNewTeachForm = {renderNewTeachForm}
                        renderSendCredential = {renderSendCredential}
                        renderCoursePage={renderCoursePage}
                        renderEditCourse = {renderEditCourse}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default InstructorHomePageComponent;

const Profile = (props) => {
  const profile = props.currentUser.profile;
  const institute = props.currentUser.institute;
  return(
    <>
      <i className="bi bi-person-fill icon-profile"></i>
      <button id="addNewGroup" className="btn btn-profile" onClick={props.renderProfileForm}>
        <i className="bi bi-pencil-fill icon-profile-edit"></i>
      </button>
      <h3>{profile.firstName} {profile.lastName}</h3>
      <h5> <i className="bi bi-envelope-fill icon-n"></i> <br/>{profile.email} </h5>
      <h5> <i className="bi bi-telephone-fill icon-n"></i> <br/>{profile.phone} </h5>
      <h5> <i className="bi bi bi-building-fill icon-n"></i> <br/>{institute}</h5>
      <h5> <i className="bi bi-geo-alt-fill icon-n"></i><br/>{profile.address}</h5>
      <pre>{profile.description}</pre>
    </>
  )
};

const Course = (props) => {
  return(
    <>
      <h3>Courses
        <button className="btn btn-round" onClick={props.renderNewTeachForm}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </h3>
      <table className="table table-borderless">
        <tbody>
          {props.currentUser.teach.map((teach) => (
            <tr key={teach._id}>
              <td className="td-title">
                  {teach.name}
              </td>
              <td className="td-icon">
                <button className="btn btn-round" onClick={()=>{props.renderCoursePage(teach._id)}}>
                  <i className="bi bi-search"></i>
                </button>
                <button className="btn btn-round" onClick={()=>{props.renderEditCourse(teach._id)}}>
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-round" onClick={()=>{props.renderSendCredential(teach._id)}}>
                <i class="bi bi-send"></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </>
  )
};


// {currentUser && (
//   <div>
//     <h1 className="mb-3">My home page</h1>
//     <header className="">
//       <h3>
//         Name: {currentUser.username}
//       </h3>
//       <h3>
//         Email: {currentUser.email}
//       </h3>
//       <h3>
//         Institute: {currentUser.institute}
//       </h3>
//     </header>
//     <button id="editInstitute" className="btn btn-primary" onClick={renderInstituteForm}>
//       Edit
//     </button>
//   </div>
// )}
// {/* Show all courses (if login) */}
// {currentUser && (
//   <div>
//     <h3 className="mt-5 mb-3">Courses &emsp;
//       <button id="addNewCourse" className="btn btn-primary" onClick={renderNewTeachForm}>
//         Add new course
//       </button>
//     </h3>
//     <div>
//       {currentUser.teach.map((teach) => (
//         <div key={teach._id} className="mb-3">
//           <Link className="text-primary h3" to={`courses/${teach._id}/edit`}>{teach.name}</Link> &emsp;&emsp;
//           <button className="btn btn-warning" onClick={() => renderCoursePage(teach._id)} >View course</button> &emsp;&emsp;
//           <button className="btn btn-success" onClick={() => renderSendCredential(teach._id)} >Send credentials</button>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
