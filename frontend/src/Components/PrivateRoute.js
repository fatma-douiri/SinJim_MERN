import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
 
    const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  console.log(user)

//   if ( isAuth && user.role === 0) return <Redirect to="/adminDashboard"/>

  if (!isAuth) return <Redirect to="/login" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;