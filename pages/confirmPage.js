import StyleClasses from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
const FinalPage = () => {
  const [loggedUser, setUser] = useState({})
  const router = useRouter()
  const routerData = router?.query?.data?? ""
  const userObject = router?.query?.user?? ""
  const page = routerData !== ""? JSON.parse(routerData): {};
  const user = userObject !== "" ? JSON.parse(userObject): {};
  console.log(user)

  useEffect(() => {
    FB.api(`/${user.userID}/`, function (response) {
      if (response && !response.error) {
        /* handle the result */
        console.log(response)
        setUser(response)
      }})

  }, []);


  const subscribePageToApp = () => {
    console.log('Subscribed') }
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageInfoContainer}>
        <h2>Hi, {loggedUser.name}</h2>
        <div className={StyleClasses.selectedPageInfo}>
          {page.name}
        </div>
      </div>
    </div>
  )
}
export default FinalPage