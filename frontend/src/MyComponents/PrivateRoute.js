import React from "react";
import {  useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
//import { useSelector } from "react-redux";

const PrivateRoute = ({token, user, component: Component, ...rest }) => {
 
  const isAuth  = useSelector((state) => state.userReducers.isAuth);
  console.log("privateroute: isAuth:",isAuth)
  

console.log("PrivateRoute: token=",token)

  if (!token) return <Redirect to="/Login" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;