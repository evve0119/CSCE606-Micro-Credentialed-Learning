import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseService from "../../services/course.service";

const CourseHomePageComponent = (props) => {
  let [currentCourse, setCurrentCourse] = useState(null);
  let [currentCourseId, setCurrentCourseId] = useState(useParams()._id)
  //  Get current user all information from database
  useEffect(() => {
    CourseService.renderCoursePage(currentCourseId)
    .then(({ data }) => {
      setCurrentCourse(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If login and instructor */}
      {props.currentRole && (
        <div
          className="form-group"
          style={{
            position: "absolute",
            background: "#fff",
            top: "10%",
            left: "10%",
            right: "10%",
            padding: 15,
            border: "2px solid #444"
          }}
        >
          {currentCourse && (
            <div>
              <h1>{currentCourse.name}</h1>
              <br />
              <h4>Instructor</h4>
              <p>{currentCourse.holder.username}</p>
              <br />
              <h4>Enrolled students number</h4>
              <p>{currentCourse.students.length}</p>
              <br />
              <h4>Description</h4>
              <p>{currentCourse.description}</p>
              <br />

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseHomePageComponent;



// import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import CourseService from "../../services/course.service";

// import {Modal, Form, Button} from "react-bootstrap";

// const CourseHomePageComponent = (props) => {
//   let [currentCourse, setCurrentCourse] = useState(null);
//   let [currentCourseId, setCurrentCourseId] = useState(useParams()._id);
//   //  Get current user all information from database
//   useEffect(() => {
//     CourseService.renderCoursePage(currentCourseId)
//     .then(({ data }) => {
//       setCurrentCourse(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);
//   const history = useHistory();
//   const handleClose = e => {
//     history.push("instructor/home");
//   };

//   return (
//     <div style={{ padding: "3rem" }}>
//       {/* If not login*/}
//       {!props.currentRole && (
//         <h1>Please Login</h1>
//       )}
//       {/* If login and instructor */}
//       {props.currentRole && (
//         <Modal show={true} centered scrollable backdrop="static" onHide={handleClose}>
//               <Modal.Header closeButton>
//                   <Modal.Title>{props.currentCourse.name}</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <br />
//                 <h4>Instructor</h4>
//                 <p>{props.currentCourse.holder.username}</p>
//                 <br />
//                 <h4>Enrolled students number</h4>
//                 <p>{props.currentCourse.students.length}</p>
//                 <br />
//                 <h4>Description</h4>
//                 <p>{props.currentCourse.description}</p>
//                 <br />
//               </Modal.Body>
//               <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose}>
//                       Close
//                   </Button>
//               </Modal.Footer>
//           </Modal>
//       )}
//     </div>
//   );
// };

// export default CourseHomePageComponent;
//       // <div
//       //     className="form-group"
//       //     style={{
//       //       position: "absolute",
//       //       background: "#fff",
//       //       top: "10%",
//       //       left: "10%",
//       //       right: "10%",
//       //       padding: 15,
//       //       border: "2px solid #444"
//       //     }}
//       //   >
//       //     {currentCourse && (
//       //       <div>
//       //         <h1>{currentCourse.name}</h1>
//       //         <br />
//       //         <h4>Instructor</h4>
//       //         <p>{currentCourse.holder.username}</p>
//       //         <br />
//       //         <h4>Enrolled students number</h4>
//       //         <p>{currentCourse.students.length}</p>
//       //         <br />
//       //         <h4>Description</h4>
//       //         <p>{currentCourse.description}</p>
//       //         <br />

//       //       </div>
//       //     )}
//       //   </div>
