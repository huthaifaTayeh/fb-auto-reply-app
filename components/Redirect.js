import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Redirect({ dbUser, fbUser, children }) {
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    redirect();
  }, [router.asPath]);

  const redirect = async () => {
    setIsLoading(true);
    // loggedin with facebook and exist in database
    if (dbUser) {
      await Router.push('/');
    } else if (fbUser) {
      // logged in with facebook but not exist in database
      await Router.push('/register');
    } else {
      await Router.push('/login');
    }
    setIsLoading(false);
  };

  if (loading)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );

  return children;
}
