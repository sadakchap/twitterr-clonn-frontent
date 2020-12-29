import { Route, Switch, useLocation } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Feed from "../../ProtectedPages/Feed/Feed";
import CreateTweetModal from "../CreateTweetModal/CreateTweetModal";
import ShowTweetModal from "../ShowTweetModal/ShowTweetModal";
import UserProfile from "../UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/i/flow/signup" component={Register} />
        <PrivateRoute exact path="/home" component={Feed} />
        <PrivateRoute path="/tweet/:type/:id" component={ShowTweetModal} />
        <PrivateRoute exact path="/:username" component={UserProfile} />
        <Route>{"404"}</Route>
      </Switch>
      {background && (
        <>
          <PrivateRoute path="/tweet/:type/:id" component={ShowTweetModal} />
          <PrivateRoute path="/compose/tweet" component={CreateTweetModal} />
        </>
      )}
    </div>
  );
};

export default Routes;
