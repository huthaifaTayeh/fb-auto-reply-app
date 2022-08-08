import StyleClasses from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import * as props from "next/client";
const FinalPage = () => {
  const router = useRouter()
  const page = JSON.parse(props.router.query.data);
  const subscribePageToApp = () => {  }
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageSelectionContainer}>
        <h3>Hi, {user}</h3>
        <div>
          {page.name}
        </div>
      </div>
    </div>
  )
}
export default FinalPage