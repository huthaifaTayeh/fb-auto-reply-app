import {Fragment, useEffect, useState} from "react";
import {getFbPages} from "../utils/APIs";
import Script from "next/script";

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
    <Fragment>
      {/*{!isConnected && <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"*/}
      {/*                      data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>}*/}
      <Script>
        {`var finished_rendering = function() {
          console.log("finished rendering plugins");
          var spinner = document.getElementById("spinner");
          spinner.removeAttribute("style");
          spinner.removeChild(spinner.childNodes[0]);
        }
          FB.Event.subscribe('xfbml.render', finished_rendering);
        `}      </Script>
      <div id="spinner"
           style="
        background: #4267b2;
        border-radius: 5px;
        color: white;
        height: 40px;
        text-align: center;
        width: 250px;">
        Loading
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-use-continue-as="true"
        ></div>
      </div>
      {pages.length > 0 && pages.map(page => <h2 key={page.id}>{page.name}</h2>)}
    </Fragment>)
}
