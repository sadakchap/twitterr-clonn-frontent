import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Feed from "../../ProtectedPages/Feed/Feed";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/i/flow/signup" component={Register} />
        <PrivateRoute exact path="/home" component={Feed} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
