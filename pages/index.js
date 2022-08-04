import {useEffect, useState} from "react";
import {getFbPages} from "../utils/APIs";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [pages, setPages] = useState([])

  const fetchPages = async (id, token) => {
    try{
      const pages = await getFbPages(id, token)
      console.log("FETCHED PAGES ARE ", pages)
      setPages(prevState => prevState.concat(pages.data))
      setIsConnected(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    if (typeof window !== "undefined") {
      const wasFetched = localStorage.getItem("hasBeenFetched")?? false
      if (!wasFetched) {
        setTimeout(() => {location.reload();}, 5000)
      }
      const accessToken = localStorage.getItem('AccessToken')
      const userID = localStorage.getItem('UserID')
      fetchPages(userID, accessToken)
    }
  }, [])

  return (
    <>
      {!isConnected && <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
                            data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>}

      {pages.length > 0 && pages.map(page => <h2 key={page.id}>{page.name}</h2>)}
    </>)
}
