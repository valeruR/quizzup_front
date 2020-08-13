import React from 'react';
import {
  BrowserRouter,
} from "react-router-dom";

import AuthDataProvider from './hooks/auth-provider';
import Router from './components/router';
import AppBar from './components/AppBar';

function App() {

  /*const setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };*/

  return (
    <BrowserRouter>
      <AuthDataProvider>
        <AppBar />
        <Router />
      </AuthDataProvider>
    </BrowserRouter>
  );
}

export default App;
