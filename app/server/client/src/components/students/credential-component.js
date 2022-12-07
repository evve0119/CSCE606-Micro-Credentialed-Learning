import React, { useEffect, useState } from "react";
import StudentService from "../../services/student.service";
import "../style.css"

const CredentialComponent = (props) => {
  let [credentialData, setCredentialData] = useState(null);
  useEffect(() => {
    StudentService.renderAllCredentials()
      .then(({ data }) => {
        setCredentialData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* If not login*/}
      {!props.currentRole && (
        <h1>Please Login</h1>
      )}
      {/* If not student*/}
      {props.currentRole && props.currentRole !== "student" && (
        <h1>You Are Not a Student</h1>
      )}
      {/* If login and student */}
      {props.currentRole && props.currentRole === "student" && (
        <>
          {credentialData && (
            <div class="card-bg">
              <h3>Credentials</h3>
              <table className="table">
                <thead>
                  <tr className="phone-header">
                    <th scope="col" >#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Instructor</th>
                    <th scope="col">Institute</th>
                    <th scope="col">Issued date</th>
                  </tr>
                </thead>
                <tbody>
                  {credentialData.map((credential,idx) => (
                    <tr className="phone-body">
                      <th scope="row">{idx+1}</th>
                      <td>{credential.name}</td>
                      <td>{credential.instructor.profile.firstName} {credential.instructor.profile.lastName}</td>
                      <td>{credential.instructor.institute}</td>
                      <td>{new Date(credential.issuedDate).toDateString().slice(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CredentialComponent;
