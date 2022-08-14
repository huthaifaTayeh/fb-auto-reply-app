import Router from 'next/router';
import { useEffect, useState } from 'react';
import { findUser } from '../utils/APIs';

export default function useAuth(waitingTime) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [dbUser, setDbUser] = useState();
  const [fbUser, setFbUser] = useState();

  useEffect(() => {
    setTimeout(() => {
      // handle remembered logged in user
      FB.getLoginStatus(async ({ authResponse, status }) => {
        if (status === 'connected') {
          // user already logged in with facebook
          setFbUser(authResponse);
          // check if facebook user exist in our database
          const foundUser = await findUser(authResponse.userID);
          // exist in database > redirect to homepage
          if (foundUser) {
            setDbUser(foundUser);
            await Router.push('/');
          } else {
            // not exist in database => redirect to complete register page
            // complete register scenrio "page selection"
            await Router.push('/register');
          }
        } else {
          // no user already logged in with facebook
          await Router.push('/login');
        }
        setIsAuthenticating(false);
      });
    }, waitingTime);
  }, []);

  return {
    setIsAuthenticating,
    isAuthenticating,
    dbUser,
    fbUser,
    setDbUser,
  };
}
