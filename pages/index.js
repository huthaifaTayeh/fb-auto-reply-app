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
      <Script>
        {`
        let user_id;
        FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
         user_id = response.authResponse.userID;
        });
        FB.api(user_id + "/accounts", function(response) {
          console.log(JSON.stringify(response));         
          setPages(response);
        });
`}
      </Script>
      <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
           data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>
    </>)
}
