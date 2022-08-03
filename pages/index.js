import Script from 'next/script';
import {useState} from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [pages, setPages] = useState([])
  if(typeof window !== 'undefined'){
    console.log(window)
    if(typeof window.FBUser !== "undefined"){
      console.log("FB SUER EXISTS")
      const User = window.FBUser
      console.log(User)
      // setIsConnected(true)
      if (window.FBUser.isConnected === true) {
        setIsConnected(true)
        console.log("is connected done!")
      }
      if (window.FBUser.pages.length > 0) {
        setPages(window.FBUser.pages)
        console.log("pages is done!")
      }
    }
  }
  return (
    <>
      {!isConnected && <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
            data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>}

      {pages.length > 0 && pages.map(page => <h2 key={page.id}>{page.name}</h2>)}
    </>)
}
