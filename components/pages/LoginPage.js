import React, { useState } from 'react';
import { loginPermissionScope } from '../../config';
import { useAuth } from '../../context/auth.context';
import { findUser } from '../../utils/APIs';
import StyleClasses from '../../styles/Home.module.css';

// renders when user is not logged in with facebook yet
// actions: login
export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLogin() {
    setIsSubmitting(true);
    FB.login(
      async ({ authResponse, status, ...other }) => {
        console.log(status, other);
        if (status === 'connected') {
          // check if user is in Database
          const foundUser = await findUser(authResponse.userID);
          setIsSubmitting(false);
          login(authResponse, foundUser);
        } else {
          // The person is not logged into your webpage or we are unable to tell.
          setError('Fail to login, please try again');
          setIsSubmitting(false);
        }
      },
      {
        scope: loginPermissionScope,
      }
    );
  }

  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.fbLoginBtnContainer}>
        <div className='flex-v center'>
          <img src='/logo_white.png' width={55} height={55} />
          {/* <p>Welcome to Vetrina bot </p> */}
          <p style={{ fontSize: 20, color: 'gray' }}>
            Create a new customer support experience with automated messages
            reply satisfies your need
          </p>
        </div>
        <div id={StyleClasses['fbLoginBtn']}>
          <img src='/facebook-logo-white.png' width={25} height={25} />
          <button disabled={isSubmitting} onClick={handleLogin}>
            continue with facebook
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>
      <a href='https://manychat.com/privacy.html'>Privacy policy</a>
    </div>
  );
}
