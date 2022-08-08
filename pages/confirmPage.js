import StyleClasses from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import {useEffect} from "react";
const FinalPage = () => {
  const router = useRouter()
  const routerData = router?.query?.data?? ""
  const userObject = router?.query?.user?? ""
  const page = routerData !== ""? JSON.parse(routerData): {};
  const user = userObject !== "" ? JSON.parse(userObject): {};
  console.log(user)

  useEffect(() => {
    FB.getLoginStatus((response) => {
      console.log(FB)
    });
  }, []);


  const subscribePageToApp = () => {
    console.log('Subscribed') }
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageSelectionContainer}>
        {/*<h3>Hi, {user}</h3>*/}
        <div>
          {page.name}
        </div>
      </div>
    </div>
  )
}
export default FinalPage