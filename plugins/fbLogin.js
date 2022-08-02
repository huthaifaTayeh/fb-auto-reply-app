import Script from 'next/script';

export const renderFbLoginPlugin = () => {
  return (
    <>
      <div id="fb-root"></div>
      <Script strategy='lazyOnload' async defer crossOrigin="anonymous"
              src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=370648808391745&autoLogAppEvents=1"
              nonce="z2FdTQwI">

      </Script>
      <Script strategy='lazyOnload'>{`
        window.fbAsyncInit = function () {
          FB.init({
            appId: '370648808391745',
            cookie: true,
            xfbml: true,
            version: '14.0'
          });

          FB.AppEvents.logPageView();

        };
        
        FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
        });

        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      `}</Script>

    </>
  )
}