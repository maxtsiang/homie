import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Nav from "../components/Nav";
import Verify from "../pages/Verify";
import EditProfile from "../pages/EditProfile";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && currentUser.emailVerified) {
          if (currentUser && currentUser.displayName && currentUser.photoURL) {
            return (
              <>
                <Nav />
                <Component {...props} />
              </>
            );
          } else {
            return (
              <>
                <Nav />
                <EditProfile new />
              </>
            );
          }
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
