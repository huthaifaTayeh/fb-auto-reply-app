import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v14.0&appId=370648808391745&autoLogAppEvents=1'
        nonce='gi4TbDU5'
      ></script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
