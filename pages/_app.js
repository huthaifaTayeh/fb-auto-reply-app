import '../styles/globals.css';
import NoSSR from 'react-no-ssr';
import useAuth from '../hooks/useAuth';
import { mockState, testingMode } from '../config';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import Redirect from '../components/Redirect';

function MyApp({ Component, pageProps }) {
  const { dbUser, fbUser, isAuthenticating, setDbUser } = useAuth(250);
  return (
    <>
      <script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v14.0&appId=370648808391745&autoLogAppEvents=1'
        nonce='gi4TbDU5'
      ></script>
      {/* wrap all pages with no ssr component wrapper so we can use window object safetly */}
      {/* check this reference https://blog.bitsrc.io/using-non-ssr-friendly-components-with-next-js-916f38e8992c#:~:text=You%20can%20use%20the%20ssr,imported%20component%2C%20as%20shown%20below.&text=Or%20else%2C%20you%20can%20create,that%20component%20to%20disable%20SSR. */}
      <NoSSR>
        {isAuthenticating ? (
          <div style={loadingStyles}>Loading ...</div>
        ) : (
          <Component
            {...pageProps}
            setDbUser={setDbUser}
            dbUser={dbUser}
            fbUser={fbUser}
          />
        )}
      </NoSSR>
    </>
  );
}

export default MyApp;

const loadingStyles = {
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
