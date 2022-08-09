import StyleClasses from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { baseURL } from '../config';

const mockUser = {
  name: 'hatem',
};

const mockPage = {
  name: 'hatem page',
};
const FinalPage = () => {
  const [loggedUser, setUser] = useState(mockUser);
  const [isLoading, setLoading] = useState(false);

  // TODO uncomment
  const page = mockPage;
  // routerData !== ""? JSON.parse(routerData): {};
  // const userObject = router?.query?.user?? ""
  // const user = userObject !== "" ? JSON.parse(userObject): {};

  // useEffect(() => {
  //   // check if user is subscriped to page
  //   let isSubscribed = false
  //   FB.api(`/${user.userID}/`, function (response) {
  //     if (response && !response.error) {
  //       /* handle the result */
  //       setUser(response)
  //     }})
  //   FB.api(`/${page.id}/subscribed_apps`, "GET", {access_token: page.access_token}, (response) => { ////
  //     console.log(response)
  //     response?.data.forEach(app => {
  //       if(app.name === 'auto-bot'){
  //         isSubscribed = true
  //       }
  //     })
  //   })

  //   if(!isSubscribed){
  //     FB.api(`/${page.id}/subscribed_apps`, "POST", {
  //       subscribed_fields: 'feed',
  //       access_token: page.access_token
  //     }, (response) => {
  //       console.log('subscribe tto app response ', response)
  //     })
  //   }
  //   setLoading(false) //// should be removed

  // }, []);

  const subscribePageToApp = () => {
    console.log('Subscribed');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const reply = e.target[0]?.value;

    try {
      // make api call to update config
      const res = await axios.put(
        `${baseURL}/api/pages/config`,
        {
          newConfig: {
            reply,
          },
        },
        {
          headers: {
            // TODO add access token here
            authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      // TODO update page state with new config
    } catch (err) {
      alert('something went wrong, check logs');
      console.log(err);
    }
  };
  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageInfoContainer}>
        <h2>Hi, {loggedUser.name}</h2>
        <div className={StyleClasses.selectedPageInfo}>
          <span>{page.name}</span> page is selected
        </div>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* TODO default value from what is stored in db */}
            <label htmlFor='reply'>
              reply message
              <input name='reply' placeholder='comment reply template' />
            </label>
            {/* TODO later we need input to specify keywords */}
            {/* <input/> */}
            <Button type='submit'>Save changes</Button>
          </div>
        </form>

        {/*         {isLoading ? (
          <>
            <div className={StyleClasses.center}>
              <div className={StyleClasses.ring}></div>
              <span>Subscribing...</span>
            </div>
          </>
        ) : (
          <div className={StyleClasses.success}>
            <div className={StyleClasses.ringSuccess}></div>
            <span>Success!</span>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default FinalPage;
