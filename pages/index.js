import React, { useEffect } from 'react';
import { useAuth, AUTH_STATES } from '../context/auth.context';
import { findUser } from '../utils/APIs';
// pages import
import LoadingPage from '../components/pages/LoadingPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import HomePage from '../components/pages/HomePage';
import MessageRepliesFrom from '../components/MessageRepliesFrom';

const ActivePage = {
  [AUTH_STATES.AUTHENTICATING]: <LoadingPage />,
  [AUTH_STATES.NOT_LOGGED_IN]: <LoginPage />,
  [AUTH_STATES.LOGGED_IN_WITH_FACEBOOK_ONLY]: <RegisterPage />,
  [AUTH_STATES.LOGGED_IN]: <HomePage />,
};

export default function Main() {
  const {
    authState,
    handleAlreadyLoggedInUser,
    handleAlreadyLoggedWithFacebookOnly,
    handleNoLoggedUser,
  } = useAuth();

  //   this runs when app start to check if there's loggedin user
  useEffect(() => {
    // waiting until fb api is ready
    setTimeout(() => {
      // handle remembered logged in user
      FB.getLoginStatus(async ({ authResponse, status }) => {
        if (status === 'connected') {
          // user already logged in with facebook
          // check if facebook user exist in our database
          const foundUser = await findUser(authResponse.userID);
          // exist in database
          if (foundUser) {
            handleAlreadyLoggedInUser(authResponse, foundUser);
          } else {
            // not exist in database
            handleAlreadyLoggedWithFacebookOnly(authResponse);
          }
        } else {
          // no user already logged in with facebook
          handleNoLoggedUser();
        }
      });
    }, 250);
  }, []);

  return ActivePage[authState];
}
