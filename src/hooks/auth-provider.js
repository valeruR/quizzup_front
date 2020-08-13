import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthDataContext = createContext(null);

const initialValue = {};

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialValue);

  useEffect(() => {
    const token = localStorage.getItem('token');
    //const expiryDate = localStorage.getItem('expiryDate');
    if (!token/* || !expiryDate*/) {
      return;
    }
    /*if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }*/
    const userId = localStorage.getItem('userId');
    /*const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();*/
    setAuthData({
      token: token,
      userId: userId,
      isAuth: true,
      error: null
    })
  }, []);

  const onLogout = () => {
    setAuthData({
      token: null,
      userId: null,
      isAuth: false,
      error: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  const onLogin = authData => {
    const graphqlQuery = {
      query: `
        {
          login(email: "${authData.email}", password: "${authData.password}") {
            token
            userId
          }
        }
      `
    };
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.errors) {
          throw new Error('User login failed!');
        }
        console.log(resData);
        setAuthData({
          token: resData.data.login.token,
          userId: resData.data.login.userId,
          isAuth: true,
          error: null
        });
        localStorage.setItem('token', resData.data.login.token);
        localStorage.setItem('userId', resData.data.login.userId);
        /*const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);*/
      })
      .catch(err => {
        console.log(err);
        setAuthData({
          ...authData,
          error: err
        });
      });
  };

  const onSignUp = authData => {
    const graphqlQuery = {
      query: `
        mutation {
          createUser(userInput: {email: "${
            authData.email
          }", name:"${authData.name}", password:"${
        authData.password
      }"}) {
            _id
            email
          }
        }
      `
    };
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.errors) {
          throw new Error('User creation failed!');
        }
      })
      .catch(err => {
        console.log(err);
        setAuthData({
          ...authData,
          error: err
        });
      });
  };

  return <AuthDataContext.Provider value={{ authData, onLogin, onLogout, onSignUp }} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
