import React from 'react';
import { 
  Route,
  Redirect
 } from "react-router-dom";
 import { useAuthDataContext } from "../hooks/auth-provider";

const OpenRoute = ({ component: Component, ...options }) => {
  const { authData }  = useAuthDataContext();
  console.log('open route', authData);

  return <Route render={(props) => (
    authData.token
      ? <Redirect to='/' />
      : <Component {...props} />
  )} />;
};

export default OpenRoute;
