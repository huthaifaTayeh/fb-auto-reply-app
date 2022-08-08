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
    FB.api(`/${user.userID}/`, function (response) {
      if (response && !response.error) {
        /* handle the result */
        setUser(response)
      }})
    FB.api(`/${page.id}/subscribed_apps`, "GET", {access_token: page.access_token}, (response) => {
      console.log(response)
    })

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
        {isLoading && <>
          <div className={StyleClasses.center}>
            <div className={StyleClasses.ring}></div>
            <span>Subscribing...</span>
          </div>
        </>
          }
      </div>
    </div>
  )
}
export default FinalPage