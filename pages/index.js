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
      <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
           data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>
    </>)
}
