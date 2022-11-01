import { Switch, Route } from "react-router-dom";
import HomePageComponent from "./homePage-component";
import CredentialComponent from "./credential-component";
import ProfileFormComponent from "./profileForm-component";
import NewGroupFormComponent from "./newGroupForm-component";
import GroupFormComponent from "./groupForm-component";
import NewResumeFormComponent from "./newResume-component";
import ResumeFormComponent from "./resumeForm-component";
import EditResumeFormComponent from "./editResumeForm-component"


const Student = (props) => {
    return(
      <>
        <Switch>
        <Route path="/student/home">
            <HomePageComponent
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
  return(
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
  return(
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

export default Student