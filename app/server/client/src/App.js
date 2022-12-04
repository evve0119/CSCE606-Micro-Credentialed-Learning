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
  const [currentRole, setCurrentRole] = useState(AuthService.getCurrentRole());
  return (
    <div className="h-100">
      <NavComponent currentRole={currentRole} setCurrentRole={setCurrentRole} />
      <Switch>
        <Route path="/" exact>
          <HomeComponent />
        </Route>
        <Route path="/register" exact>
          <RegisterComponent />
        </Route>
        <Route path="/login" exact>
          <LoginComponent setCurrentRole={setCurrentRole}/>
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
          <Student currentRole={currentRole}/>
        </Route>
        <Route path="/instructor">
          <Instructor currentRole={currentRole}/>
        </Route>
        <Route path="/courses">
          <Course currentRole={currentRole}/>
        </Route>
        <Route path="/recruiter">
          <Recruiter currentRole={currentRole}/>
        </Route>
        <Route path="/jobs">
          <Job currentRole={currentRole}/>
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
          <StudentHomePageComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/credentials">
          <CredentialComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/intro">
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <ProfileFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/groups/new">
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <NewGroupFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/groups/:groupId">
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <GroupFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/resumes/new">
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <NewResumeFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/resumes/:resumeId" exact>
          <ResumeFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/resumes/:resumeId/edit">
          <ResumeFormComponent currentRole={props.currentRole}/>
          <EditResumeFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/applications/:jobId">
          <ApplicationComponent currentRole={props.currentRole}/>
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
          <NewGroupFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/groups/:groupId">
          <GroupFormComponent currentRole={props.currentRole}/>
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
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <NewResumeFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/resumes/:resumeId" exact>
          <ResumeFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/student/resumes/:resumeId/edit">
          <StudentHomePageComponent currentRole={props.currentRole}/>
          <EditResumeFormComponent currentRole={props.currentRole}/>
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
          <InstructorHomePageComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/new" exact>
          <NewTeachFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/:courseId/edit" exact>
          <CourseFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/:courseId/sendCredential" exact>
          <SendCredentialComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/intro" exact>
          <InstituteFormComponent currentRole={props.currentRole}/>
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
          <CourseHomePageComponent currentRole={props.currentRole}/>
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
          <RecruiterHomePageComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/new" exact>
          <NewJobFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/:jobId/edit" exact>
          <JobFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/:jobId/applications" exact>
          <RenderApplicationComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/:jobId/applications/:resumeId" exact>
          <RenderResumeComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/intro" exact>
          <CompanyFormComponent currentRole={props.currentRole}/>
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
          <AllJobComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/jobs/:_id">
          <JobHomePageComponent currentRole={props.currentRole}/>
        </Route>
      </Switch>
    </>
  )
};

export default App;
