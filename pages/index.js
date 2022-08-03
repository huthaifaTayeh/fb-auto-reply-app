import Script from 'next/script';

export default function Home() {
  if(typeof window !== 'undefined'){
    console.log(window)
  }
  return (
    <>
      <div className="fb-login-button" data-width="200" data-size="large" data-button-type="login_with"
           data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>
    </>)
}
