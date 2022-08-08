import { useEffect, useState } from 'react';
import { getFbPages } from '../utils/APIs';
import StyleClasses from '../styles/Home.module.css'

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    FB.getLoginStatus(({ authResponse, status }) => {
      if (status === 'connected') {
        saveUser(authResponse);
      }
      setIsLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const wasFetched = localStorage.getItem('hasBeenFetched') ?? false;
  //     /*     if (!wasFetched) {
  //       setTimeout(() => {
  //         location.reload();
  //       }, 5000);
  //     } */
  //     const accessToken = localStorage.getItem('AccessToken');
  //     const userID = localStorage.getItem('UserID');
  //     fetchPages(userID, accessToken);
  //   }
  // }, []);

  const handleLogin = () => {
    // console.log(FB);
    FB.login(
      ({ authResponse, status }) => {
        if (status === 'connected') {
          // Logged into your webpage and Facebook.
          saveUser(authResponse);
        } else {
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
  else return <div className={StyleClasses.fbLoginContainer}>
    <div className={StyleClasses.fbLoginBtnContainer}>
      <div className={StyleClasses.greyCircle} />
      <button onClick={handleLogin}>login with facebook</button>
    </div>
  </div>;
}

const HomePage = ({ user, setUser }) => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState();

  const fetchPages = async () => {
    try {
      const pages = await getFbPages(user.userID, user.accessToken);
      console.log('FETCHED PAGES ARE ', pages);
      setPages((prevState) => prevState.concat(pages.data));
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

  const confirmSelection = () => { 
    // TODO show subscribe page 
  }

  return (
    <>
      {/* TODO design page selection */}
      {pages.map((page) => (
        <div key={page.id}>
          <p
            style={{ color: selectedPage?.id === page.id ? 'blue' : 'black' }}
            onClick={() => setSelectedPage(page.id)}
          >
            {page.name}
          </p>
        </div>
      ))}

      <button onClick={confirmSelection}>select</button>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

// // TODO complete component
// const FinalPage = () => {
//   const subscribePageToApp = () => {  }
//   return (
//
//   )
//  }