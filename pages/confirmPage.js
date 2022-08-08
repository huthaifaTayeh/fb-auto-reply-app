import StyleClasses from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
const FinalPage = () => {
  const [loggedUser, setUser] = useState({})
  const [isLoading, setLoading] = useState(true)
  const router = useRouter()
  const routerData = router?.query?.data?? ""
  const userObject = router?.query?.user?? ""
  const page = routerData !== ""? JSON.parse(routerData): {};
  const user = userObject !== "" ? JSON.parse(userObject): {};

  useEffect(() => {
    let isSubscribed = false
    FB.api(`/${user.userID}/`, function (response) {
      if (response && !response.error) {
        /* handle the result */
        setUser(response)
      }})
    FB.api(`/${page.id}/subscribed_apps`, "GET", {access_token: page.access_token}, (response) => {
      console.log(response)
      response?.data.forEach(app => {
        if(app.name === 'auto-bot'){
          isSubscribed = true
        }
      })
    })

    if(!isSubscribed){
      FB.api(`/${page.id}/subscribed_apps`, "POST", {
        subscribed_fields: 'feed',
        access_token: page.access_token
      }, (response) => {
        console.log('subscribe tto app response ', response)
      })
    }
    setLoading(false)

  }, []);


  const subscribePageToApp = () => {
    console.log('Subscribed') }
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageInfoContainer}>
        <h2>Hi, {loggedUser.name}</h2>
        <div className={StyleClasses.selectedPageInfo}>
          <span>{page.name}</span> page is selected
        </div>
        {isLoading? <>
          <div className={StyleClasses.center}>
            <div className={StyleClasses.ring}></div>
            <span>Subscribing...</span>
          </div>
        </>: <div className={StyleClasses.success}>
          <div className={StyleClasses.ringSuccess}></div>
          <span>Success!</span>
        </div>
          }
      </div>
    </div>
  )
}
export default FinalPage