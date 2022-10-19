import React, {useState} from "react";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import StudentHomePageComponent from "./components/students/studentHomePage-component";
import CredentialComponent from "./components/students/credential-component";
import NewGroupFormComponent from "./components/students/newGroupForm-component";
import GroupFormComponent from "./components/students/groupForm-component";
import InstructorHomePageComponent from "./components/instructors/instructorHomePage-component";
import NewTeachFormComponent from "./components/instructors/newTeachForm-components";
import SendCredentialComponent from "./components/courses/sendCredential-component"
import AuthService from "./services/auth.service";


function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
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
        <Route path="/studentHomePage" exact>
          <StudentHomePageComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/allCredentials" exact>
          <CredentialComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/newGroupForm" exact>
          <NewGroupFormComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/groupForm/:_id">
          <GroupFormComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/instructorHomePage" exact>
          <InstructorHomePageComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/newTeachForm" exact>
          <NewTeachFormComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route path="/sendCredential/:_id" exact>
          <SendCredentialComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
