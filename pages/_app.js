import '../styles/globals.css'
import {renderFbLoginPlugin} from "../plugins/fbLogin";

function MyApp({ Component, pageProps }) {
  return <>
    {renderFbLoginPlugin()}
    <Component {...pageProps} />
  </>
}

export default MyApp
