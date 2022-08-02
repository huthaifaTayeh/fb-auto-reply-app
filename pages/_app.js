import '../styles/globals.css'
import {renderFbLoginPlugin} from "../plugins/fbLogin";

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    {renderFbLoginPlugin()}
  </>
}

export default MyApp
