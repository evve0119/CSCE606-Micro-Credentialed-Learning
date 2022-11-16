import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ForgotComponent from "./components/forgot_component";
import AuthService from "./services/auth.service";

import StudentHomePageComponent from "./components/students/homePage-component";
import CredentialComponent from "./components/students/credential-component";
import ProfileFormComponent from "./components/students/profileForm-component";
import NewGroupFormComponent from "./components/students/newGroupForm-component";
import GroupFormComponent from "./components/students/groupForm-component";
import NewResumeFormComponent from "./components/students/newResume-component";
import ResumeFormComponent from "./components/students/resumeForm-component";
import EditResumeFormComponent from "./components/students/editResumeForm-component"
import ApplicationComponent from "./components/students/application-component";

import InstructorHomePageComponent from "./components/instructors/homePage-component";
import NewTeachFormComponent from "./components/instructors/newTeachForm-components";
import SendCredentialComponent from "./components/instructors/sendCredential-component"
import CourseFormComponent from "./components/instructors/courseForm-component";
import InstituteFormComponent from "./components/instructors/instituteForm-component";

import RecruiterHomePageComponent from "./components/recruiters/homePage-component";
import NewJobFormComponent from "./components/recruiters/newJobForm-components";
import JobFormComponent from "./components/recruiters/jobForm-component";
import RenderApplicationComponent from "./components/recruiters/renderApplication-component";
import RenderResumeComponent from "./components/recruiters/renderResume-component";
import CompanyFormComponent from "./components/recruiters/CompanyForm-component";

import CourseHomePageComponent from "./components/courses/homePage-component";

import AllJobComponent from "./components/jobs/allJob-component";
import JobHomePageComponent from "./components/jobs/homePage-component";
import EmailVerify from "./components/EmailVerification/email-verification";
import ResetPassword from "./components/EmailVerification/reset-password";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route path="/" exact>
          <HomeComponent />
        </Route>
        <Route path="/register" exact>
          <RegisterComponent />
        </Route>
        <Route path="/login" exact>
          <LoginComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/forgot" exact>
          <ForgotComponent/>
        </Route>
        <Route path="/user/:id/reset/:token" exact>
          <ResetPassword/>
        </Route>
        <Route path="/user/:id/verify/:token" exact>
          <EmailVerify/>
        </Route>
        <Route path="/student">
          <Student
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/instructor">
          <Instructor
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/courses">
          <Course
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/recruiter">
          <Recruiter
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/jobs">
          <Job
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
      </Switch>
    </div>
  );
}

const Student = (props) => {
  return (
    <>
      <Switch>
        <Route path="/student/home">
          <StudentHomePageComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/credentials">
          <CredentialComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/intro">
          <ProfileFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/groups">
          <Group
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/resumes">
          <Resume
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/applications/:_id">
          <ApplicationComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Group = (props) => {
  return (
    <>
      <Switch>
        <Route path="/student/groups/new">
          <NewGroupFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/groups/:_id">
          <GroupFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Resume = (props) => {
  return (
    <>
      <Switch>
        <Route path="/student/resumes/new">
          <NewResumeFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/resumes/:_id" exact>
          <ResumeFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/student/resumes/:_id/edit">
          <EditResumeFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Instructor = (props) => {
  return (
    <>
      <Switch>
        <Route path="/instructor/home" exact>
          <InstructorHomePageComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/instructor/courses/new" exact>
          <NewTeachFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/instructor/courses/:_id/edit" exact>
          <CourseFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/instructor/courses/:_id/sendCredential" exact>
          <SendCredentialComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/instructor/intro" exact>
          <InstituteFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Course = (props) => {
  return (
    <>
      <Switch>
        <Route path="/courses/:_id">
          <CourseHomePageComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Recruiter = (props) => {
  return (
    <>
      <Switch>
        <Route path="/recruiter/home" exact>
          <RecruiterHomePageComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/recruiter/jobs/new" exact>
          <NewJobFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/recruiter/jobs/:_id/edit" exact>
          <JobFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/recruiter/jobs/:_id/applications" exact>
          <RenderApplicationComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/recruiter/jobs/:_id/applications/:resumeId" exact>
          <RenderResumeComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/recruiter/intro" exact>
          <CompanyFormComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

const Job = (props) => {
  return (
    <>
      <Switch>
      <Route path="/jobs/" exact>
          <AllJobComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
        <Route path="/jobs/:_id">
          <JobHomePageComponent
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </Route>
      </Switch>
    </>
  )
};

export default App;
