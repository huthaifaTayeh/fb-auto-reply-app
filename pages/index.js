import Script from 'next/script';
import {useState} from "react";

export default function Home() {
  const [pages, setPages] = useState([])
  if(typeof window !== 'undefined'){
    console.log(window)
  }
  console.log(pages)
  return (
    <>
      <div id="status"></div>
      <Script id="fb-script" strategy="beforeInteractive" onError={() => {
        console.log("Oopes !")}} onReady={() => {
        console.log("Ready!")
      }}>{`
        let user_id;
        window.fbAsyncInit = function () {
          FB.init({
            appId: '370648808391745',
            cookie: true,
            xfbml: true,
            version: '14.0'
          });

          FB.AppEvents.logPageView();

        };
        
        FB.login(function(response) {
           console.log(response);
        }, {scope: 'page_messaging'});
        
        FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
         user_id = response.authResponse.userID;
        });
        
        FB.api(user_id + "/accounts", function(response) {
          console.log(JSON.stringify(response));
          window.pages = response.data
        });

        
        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      function statusChangeCallback(response) {
                console.log('statusChangeCallback');
                console.log(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log('Successful login for: ' + response.name);
                        document.getElementById('status').innerHTML =
                          'Thanks for logging in, ' + response.name + '!';
                    });
                } else {
                    // The person is not logged into your app or we are unable to tell.
                    document.getElementById('status').innerHTML = 'Please log ' +
                      'into this app.';
                }
            }
      `}</Script>
      <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
           data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>
    </>)
}
