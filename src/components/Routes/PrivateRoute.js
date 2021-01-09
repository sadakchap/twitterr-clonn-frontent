import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../../contexts/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuthState();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
