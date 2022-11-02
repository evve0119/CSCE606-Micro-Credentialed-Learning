import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import StudentHomePageComponent from "./components/students/homePage-component";
import CredentialComponent from "./components/students/credential-component";
import ProfileFormComponent from "./components/students/profileForm-component";
import NewGroupFormComponent from "./components/students/newGroupForm-component";
import GroupFormComponent from "./components/students/groupForm-component";
import NewResumeFormComponent from "./components/students/newResume-component";
import ResumeFormComponent from "./components/students/resumeForm-component";
import EditResumeFormComponent from "./components/students/editResumeForm-component"
import InstructorHomePageComponent from "./components/instructors/homePage-component";
import NewTeachFormComponent from "./components/instructors/newTeachForm-components";
import SendCredentialComponent from "./components/instructors/sendCredential-component"
import CourseHomePageComponent from "./components/courses/homePage-component";
import CourseFormComponent from "./components/instructors/courseForm-component";
import AuthService from "./services/auth.service";


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

export default App;
