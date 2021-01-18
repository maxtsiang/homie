import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import Verify from "../pages/Verify";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && currentUser.emailVerified) {
          return (
            <>
              <Nav />
              <Component {...props} />
            </>
          );
        } else if (currentUser && !currentUser.emailVerified) {
          return <Verify />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
}

export default PrivateRoute;
