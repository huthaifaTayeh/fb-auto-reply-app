import StyleClasses from "../styles/Home.module.css";
import { useRouter } from 'next/router'
const FinalPage = () => {
  const router = useRouter()
  // const page = JSON.parse(router.query.data);
  console.log(typeof router.query.data)
  const subscribePageToApp = () => {
    console.log('Subscribed') }
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageSelectionContainer}>
        {/*<h3>Hi, {user}</h3>*/}
        <div>
          {/*{page.name}*/}
        </div>
      </div>
    </div>
  )
}
export default FinalPage