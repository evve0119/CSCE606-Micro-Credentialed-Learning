import React from "react";
import { useHistory } from "react-router-dom";

const HomeComponent = (props) => {
  const history = useHistory();
  if(props.currentRole){
    history.replace(`/${props.currentRole}/home`);
  }
  function studentLogin() {
    history.push({
      pathname: "/login/student",
      state: {role: "student"}
    })
  }
  function instructorLogin() {
    history.push({
      pathname: "/login/instructor",
      state: {role: "instructor"}
    })
  }
  function recruiterLogin() {
    history.push({
      pathname: "/login/recruiter",
      state: {role: "recruiter"}
    })
  }
  return (
    <main>
      <div className="container py-4">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Micro-Credentialed Learning System</h1>
          <p className="col-md-8 fs-4">
            Life Learning, Life Wealth
          </p>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a Student</h2>
              <p>
                You can become a student by registering as one, and start 
                managing your credentials and building resumes based on them.
              </p>
              <button className="btn btn-outline-light" type="button" onClick={studentLogin}>
                Login or Register Now
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As an Instructor</h2>
              <p>
                You can become an instructor by registering as one, and start
                making online courses.
              </p><br />
              <button className="btn btn-outline-secondary " type="button" onClick={instructorLogin}>
                Login or Register Now
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a Recruiter</h2>
              <p>
                You can become a recruiter by registering as one, and start
                posting jobs.
              </p><br />
              <button className="btn btn-outline-light" type="button" onClick={recruiterLogin}>
                Login or Register Now
              </button>
            </div>
          </div>
          
          <p className="mt-2">
            This website is for practice purpose only, 
            so please do not provide any personal information, such as credit card numbers.
          </p>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2022 Boba Tea Forever
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
