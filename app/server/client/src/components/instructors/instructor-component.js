import { Switch, Route } from "react-router-dom";
import HomePageComponent from "./homePage-component";
import NewTeachFormComponent from "./newTeachForm-components";
import SendCredentialComponent from "./sendCredential-component"

const Instructor = (props) => {
    return(
      <>
        <Switch>
        <Route path="/instructor/home" exact>
            <HomePageComponent
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
          <Route path="/instructor/courses/:_id" exact>
            <SendCredentialComponent
              currentUser={props.currentUser}
              setCurrentUser={props.setCurrentUser}
            />
          </Route>
        </Switch>
      </>
    )
};

export default Instructor;