import { useEffect, useState } from 'react';
import {
  getFbPages,
  getSubscribedPages,
  subscribedPageToApp,
} from '../utils/APIs';
import StyleClasses from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL } from '../config';
import Button from '../components/Button';

const mockLoginResponse = {
  accessToken:
    'EAAFRGmaPhEEBAOHRrDKrpS63Mq08CwClSTbaKvRizhWjt5gHey8TX9HfeepdhUb1yyuPZBqVhy7ZAx1aOUNYsJNiIUKoXZBvbJPtRJ3indkMEjIvtb9aCZAandWvljsQX392LIp0dNjK2GxzRC0E4KYXnvJjXP0urwgidodbMlf2rpOM4XWixXr2EhkirmszmTn9tfDouEBprhblzite',
  userID: '188291786871765',
};
export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(async () => {
    FB.getLoginStatus(async ({ authResponse, status }) => {
      // handle persestnant user

      if (status === 'connected') {
        const foundUser = await findUser(authResponse.userID);
        if (foundUser) {
          await router.push('/confirmPage');
        } else {
          // complete register scenrio "page selection"
          saveUser(authResponse);
          // setIsLoading(false);
        }
      }
      setIsLoading(false);
    });
  }, []);

  const handleLogin = () => {
    // console.log(FB);
    FB.login(
      async ({ authResponse, status }) => {
        if (status === 'connected') {
          const { accessToken, userID } = authResponse;
          // createUser(accessToken, userID);
          // Logged into your webpage and Facebook.

          // setIsLoading(true);
          // check if user is in Database
          const foundUser = await findUser(userID);
          if (foundUser) {
            router.push('/confirmPage');
          } else {
            // complete register scenrio "page selection"
            saveUser(authResponse);
            // setIsLoading(false);
          }
        } else {
          const foundUser = await findUser(mockLoginResponse.userID);
          console.log('found user is ', foundUser);
          if (foundUser) {
            router.push('/confirmPage');
          } else {
            // complete register scenrio "page selection"
            saveUser(mockLoginResponse);
          }
          // The person is not logged into your webpage or we are unable to tell.
        }
      },
      {
        scope: [
          'pages_show_list',
          'pages_messaging',
          'pages_read_engagement',
          'pages_manage_metadata',
          'public_profile',
        ],
      }
    );
  };

  const saveUser = (authResponse) => {
    const { accessToken, userID } = authResponse;
    setUser({ accessToken, userID });
  };

  if (isLoading) return 'loading';

  const isLoggedIn = user != null;

  if (isLoggedIn)
    // home page
    return <HomePage user={user} setUser={setUser} />;
  // login page
  else
    return (
      <div className={StyleClasses.mainContainer}>
        <div className={StyleClasses.fbLoginBtnContainer}>
          <div className={StyleClasses.greyCircle} />
          <button onClick={handleLogin}>login with facebook</button>
        </div>
      </div>
    );
}

const HomePage = ({ user, setUser }) => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState();
  const router = useRouter();

  const fetchPages = async () => {
    try {
      const pages = await getFbPages(user.userID, user.accessToken);
      console.log('FETCHED PAGES ARE ', pages);
      setPages(pages.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    FB.logout(function (response) {
      // Person is now logged out
      console.log('logout result ', response);
      setUser(null);
    });
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const confirmSelection = async () => {
    // TODO show subscribe page
    const selectedPageObject = pages.find((page) => page.id === selectedPageId);
    subscribePageToApp(selectedPageObject.id, selectedPageObject.access_token);

    const createdUser = await createUser(
      user.accessToken,
      user.userID,
      selectedPageObject.id,
      selectedPageObject.access_token
    );
    if (createdUser) {
      router.push({
        pathname: '/confirmPage',
      });
    } else {
      alert('fail creating new user');
    }
    // router.push({
    //   pathname: '/confirmPage',
    //   query: {
    //     data: JSON.stringify(pages.find((page) => page.id === selectedPage)),
    //     user: JSON.stringify(user),
    //   },
    // });
  };

  return (
    <div className={StyleClasses.mainContainer}>
      {/* TODO design page selection */}
      <div className={StyleClasses.pageSelectionContainer}>
        <h5>Select your facebook page</h5>
        <div className={StyleClasses.pagesView}>
          {pages.map((page) => (
            <div
              key={page.id}
              className={StyleClasses.pageRow}
              onClick={() => setSelectedPageId(page.id)}
            >
              <span
                className={
                  selectedPageId === page.id ? StyleClasses.selectedPage : ''
                }
              />
              <p
                className={
                  selectedPageId === page.id
                    ? StyleClasses.selectedPageFont
                    : ''
                }
              >
                {page.name}
              </p>
            </div>
          ))}
        </div>
        <div className={StyleClasses.pagesActionBtns}>
          <Button disabled={!selectedPageId} onClick={confirmSelection}>
            select
          </Button>
          {/* <button onClick={handleLogout}>logout</button> */}
        </div>
      </div>
    </div>
  );
};

// // TODO complete component
const subscribePageToApp = async (pageID, pageAccessToken) => {
  try {
    const subscribedApps = await getSubscribedPages(pageID, pageAccessToken);
    const isSubbed = subscribedApps.some((app) => app.name === 'auto-bot');
    if (!isSubbed) {
      await subscribedPageToApp(pageID, pageAccessToken);
    }
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (
  fb_user_token,
  fb_user_id,
  fb_page_id,
  fb_page_token
) => {
  try {
    // make api call to get already existing user or create one
    const res = await axios.post(`${baseURL}/api/users`, {
      fb_user_token,
      fb_user_id,
      fb_page_id,
      fb_page_token,
    });

    const { user, access_token } = res.data.data;
    localStorage.setItem('access_token', access_token);
    return user;
  } catch (err) {
    alert('something went wrong, check logs');
    console.log(err);
  }
};

const findUser = async (fb_user_id) => {
  try {
    // make api call to get already existing user or create one
    const res = await axios.get(
      `${baseURL}/api/users?fb_user_id=${fb_user_id}`
    );
    const { user, access_token } = res.data.data;
    localStorage.setItem('access_token', access_token);
    return user;
  } catch (err) {
    // alert('something went wrong, check logs');
    console.log(err);
  }
};
