import React from 'react';
import { 
  Route,
 } from "react-router-dom";
 import { useAuthDataContext } from "../hooks/auth-provider";
 import LoginPage from '../pages/Auth/LoginPage';

const PrivateRoute = ({ component, ...options }) => {
  const { authData }  = useAuthDataContext();
  const finalComponent = authData.token ? component : LoginPage;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
