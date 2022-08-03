import Script from 'next/script';
import {useState} from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  if(typeof window !== 'undefined'){
    if(window.FBUser.isConnected){
      setIsConnected(true)
    }
  }
  console.log(pages)
  return (
    <>
      {!isConnected && <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
            data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>}
    </>)
}
