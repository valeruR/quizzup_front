import React from 'react';
import {
  Switch,
} from "react-router-dom";

import PrivateRoute from './PrivateRoute';
import OpenRoute from './OpenRoute';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import HomePage from '../pages/Quizz/HomePage';
import QuizzPage from '../pages/Quizz/QuizzPage';
import CreatetQuizz from '../pages/Quizz/CreatetQuizz';

const Router = () => {
  return (
    <Switch>
          <OpenRoute exact path="/login" component={LoginPage} />
          <OpenRoute exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/create-quizz" component={CreatetQuizz} />
          <PrivateRoute path="/quizz/:id" component={QuizzPage} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
  )
}

export default Router
