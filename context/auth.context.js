import React, { createContext, useContext, useState } from 'react';

/* 
STATE FLOW
SCENARIO 1 - FIRST TIME TO VISIT THE APP
1 AUTHENTICATING -> 2 NOT_LOGGED_IN -> 3 LOGGED_IN_WITH_FACEBOOK_ONLY -> 4 LOGGED_IN * ( IF USER LOG OUT WILL WE REPEAT FROM  START FROM STATE 2)

SCENARIO 2 - ALREADY LOGGED IN WITH FACEBOOK WHEN OPENS THE APP
1 AUTHENTICATING -> 2 LOGGED_IN_WITH_FACEBOOK_ONLY -> 3 LOGGED_IN * ( IF USER LOG OUT WILL WE REPEAT SCENARIO 1 STARTING  FROM STATE 2)

SCENARIO 3 - ALREADY LOGGED IN WITH FACEBOOK AND REGISTERED WHEN OPENS THE APP
1 AUTHENTICATING -> 2 LOGGED_IN * ( IF USER LOG OUT WILL WE REPEAT SCENARIO 1 STARTING  FROM STATE 2)

SCENARIO 4 USER REGISTERED BUT NO LOGIN SESSION EXPIRED 
1 AUTHENTICATING -> 2 NOT_LOGGED_IN -> 3 LOGGED_IN * ( IF USER LOG OUT WILL WE REPEAT FROM  START FROM STATE 2)

*/
export const AUTH_STATES = {
  AUTHENTICATING: 'AUTHENTICATING',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  LOGGED_IN_WITH_FACEBOOK_ONLY: 'LOGGED_IN_WITH_FACEBOOK_ONLY', // LOGGED IN WITH FACEBOOK BUT NO ACCOUNT IN DB
  LOGGED_IN: 'LOGGED_IN',
};

const AuthContext = createContext(null);
// THIS CONTEXT WORK ONLY WITH AUTH STATE - NO API REQUESTS OR ANY OTHER LOGIC
// also we don't want other components to change the state directly - we need to provide interface to be used
// actions: login - register - logout | persestant user ( already loggedin - already loggedin with facebook only - not logged in )

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(AUTH_STATES.AUTHENTICATING);
  const [dbUser, setDbUser] = useState();
  const [fbUser, setFbUser] = useState();
  /* login and register and logout added just for readability */
  const login = (_fbUser, _dbUser) => {
    if (_fbUser && _dbUser) moveToLoggedInState(_fbUser, _dbUser);
    else if (_fbUser) moveToLoggedInWithFacebookOnlyState(_fbUser);
    else
      throw Error(
        'tries to login without passing either facebook user or db user'
      );
  };

  const register = async (_fbUser, _dbUser) => {
    moveToLoggedInState(_fbUser, _dbUser);
  };

  const logout = () => {
    moveToNotLoggedInState();
  };
  //   handle user persistency
  const handleAlreadyLoggedInUser = (_fbUser, _dbUser) => {
    moveToLoggedInState(_fbUser, _dbUser);
  };
  const handleAlreadyLoggedWithFacebookOnly = (_fbUser) => {
    moveToLoggedInWithFacebookOnlyState(_fbUser);
  };
  const handleNoLoggedUser = () => {
    moveToNotLoggedInState();
  };

  /* these functions mutate the state and control how to transform from state to another */
  const moveToNotLoggedInState = () => {
    setAuthState(AUTH_STATES.NOT_LOGGED_IN);
    setDbUser(null);
    setFbUser(null);
  };

  const moveToLoggedInState = (_fbUser, _dbUser) => {
    setAuthState(AUTH_STATES.LOGGED_IN);
    setDbUser(_dbUser);
    setFbUser(_fbUser);
  };

  const moveToLoggedInWithFacebookOnlyState = (_fbUser) => {
    setAuthState(AUTH_STATES.LOGGED_IN_WITH_FACEBOOK_ONLY);
    setDbUser(null);
    setFbUser(_fbUser);
  };

  return (
    <AuthContext.Provider
      value={{
        // states
        authState,
        fbUser,
        dbUser,
        // user actions
        login,
        register,
        logout,
        // user persistency
        handleAlreadyLoggedInUser,
        handleAlreadyLoggedWithFacebookOnly,
        handleNoLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
