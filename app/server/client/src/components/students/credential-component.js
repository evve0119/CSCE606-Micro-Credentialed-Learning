import React, { useEffect, useState } from "react";
import StudentService from "../../services/student.service";

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
    <div style={{ padding: "3rem" }}>
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
          <div>
            <h3>Credentials</h3>
            {credentialData.map((credential) => (
              <li key={credential._id}>{credential.name}</li>
            ))}
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default CredentialComponent;
