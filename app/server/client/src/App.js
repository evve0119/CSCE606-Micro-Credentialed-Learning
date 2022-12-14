import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import ForgotComponent from "./components/forgot_component";
import AuthService from "./services/auth.service";

import StudentLoginComponent from "./components/login/studentLogin-component";
import InstructorLoginComponent from "./components/login/instructorLogin-component";
import RecruiterLoginComponent from "./components/login/recruiterLogin-component";

import StudentRegisterComponent from "./components/register/studentRegister-component";
import InstructorRegisterComponent from "./components/register/instructorRegister-component";
import RecruiterRegisterComponent from "./components/register/recruiterRegister-component";

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
import CompanyFormComponent from "./components/recruiters/CompanyForm-component";

import CourseHomePageComponent from "./components/courses/homePage-component";

import AllJobComponent from "./components/jobs/allJob-component";
import JobHomePageComponent from "./components/jobs/homePage-component";
import EmailVerify from "./components/EmailVerification/email-verification";
import ResetPassword from "./components/EmailVerification/reset-password";
import "./components/style.css"
function App() {
  const [currentRole, setCurrentRole] = useState(AuthService.getCurrentRole());
  return (
    <div className="bg">
      <NavComponent currentRole={currentRole} setCurrentRole={setCurrentRole} />
      <Switch>
        <Route path="/" exact>
          <HomeComponent currentRole={currentRole}/>
        </Route>
        <Route path="/register/student" exact>
          <StudentRegisterComponent currentRole={currentRole}/>
        </Route>
        <Route path="/register/instructor" exact>
          <InstructorRegisterComponent currentRole={currentRole}/>
        </Route>
        <Route path="/register/recruiter" exact>
          <RecruiterRegisterComponent currentRole={currentRole}/>
        </Route>
        <Route path="/login/student" exact>
          <StudentLoginComponent currentRole={currentRole} setCurrentRole={setCurrentRole}/>
        </Route>
        <Route path="/login/instructor" exact>
          <InstructorLoginComponent currentRole={currentRole} setCurrentRole={setCurrentRole}/>
        </Route>
        <Route path="/login/recruiter" exact>
          <RecruiterLoginComponent currentRole={currentRole} setCurrentRole={setCurrentRole}/>
        </Route>
        <Route path="/forgot" exact>
          <ForgotComponent currentRole={currentRole}/>
        </Route>
        <Route path="/user/:id/reset/:token" exact>
          <ResetPassword currentRole={currentRole}/>
        </Route>
        <Route path="/user/:id/verify/:token" exact>
          <EmailVerify currentRole={currentRole}/>
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

const Instructor = (props) => {
  return (
    <>
      <Switch>
        <Route path="/instructor/home" exact>
          <InstructorHomePageComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/new" exact>
          <InstructorHomePageComponent currentRole={props.currentRole}/>
          <NewTeachFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/:courseId/edit" exact>
          <InstructorHomePageComponent currentRole={props.currentRole}/>
          <CourseFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/courses/:courseId/sendCredential" exact>
          <InstructorHomePageComponent currentRole={props.currentRole}/>
          <SendCredentialComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/instructor/intro" exact>
          <InstructorHomePageComponent currentRole={props.currentRole}/>
          <InstituteFormComponent currentRole={props.currentRole}/>
        </Route>d
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
          <RecruiterHomePageComponent currentRole={props.currentRole}/>
          <NewJobFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/:jobId/edit" exact>
          <RecruiterHomePageComponent currentRole={props.currentRole}/>
          <JobFormComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/jobs/:jobId/applications" exact>
          <RenderApplicationComponent currentRole={props.currentRole}/>
        </Route>
        <Route path="/recruiter/intro" exact>
          <RecruiterHomePageComponent currentRole={props.currentRole}/>
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
