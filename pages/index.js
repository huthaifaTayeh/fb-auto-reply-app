import Script from 'next/script';
import {useState, useEffect} from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [pages, setPages] = useState([])

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken')
    console.log(accessToken)

  }, [])

  return (
    <>
      {!isConnected && <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
            data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>}

      {/*{pages.length > 0 && pages.map(page => <h2 key={page.id}>{page.name}</h2>)}*/}
    </>)
}
