import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context';
import { createUser, getFbPages, subscribePageToApp } from '../../utils/APIs';
import Button from '../Button';
import StyleClasses from '../../styles/Home.module.css';

// renders when user is logged in with facebook but stil don't have record in db
// fetches user facebook pages to complete
// actions: register
export default function RegisterPage() {
  const { fbUser, register, logout } = useAuth();

  const [state, setState] = useState({
    isLoading: true,
    pages: [],
    selectedPageId: null,
  });

  useEffect(() => {
    fetchPages(fbUser.userID, fbUser.accessToken);
  }, []);

  async function fetchPages(UserID, userAccessToken) {
    try {
      const fetchedPages = await getFbPages(UserID, userAccessToken);
      setState((preState) => ({
        ...preState,
        pages: fetchedPages.data,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  function setSelectedPageId(pageID) {
    setState((prevState) => ({ ...prevState, selectedPageId: pageID }));
  }

  async function confirmSelection() {
    const selectedPageObject = state.pages.find(
      (page) => page.id === state.selectedPageId
    );
    subscribePageToApp(selectedPageObject.id, selectedPageObject.access_token);
    const createdUser = await createUser(
      fbUser.accessToken,
      fbUser.userID,
      selectedPageObject.id,
      selectedPageObject.access_token
    );
    if (createdUser) {
      register(fbUser, createdUser);
    } else {
      alert('fail creating new user');
    }
  }

  const handleLogout = () => {
    FB.logout(() => {
      logout();
    });
  };

  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageSelectionContainer}>
        <h5>Select your facebook page</h5>
        <div className={StyleClasses.pagesView}>
          {state.pages.map((page) => (
            <div
              key={page.id}
              className={StyleClasses.pageRow}
              onClick={() => setSelectedPageId(page.id)}
            >
              <span
                className={
                  state.selectedPageId === page.id
                    ? StyleClasses.selectedPage
                    : ''
                }
              />
              <p
                className={
                  state.selectedPageId === page.id
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
          <Button disabled={!state.selectedPageId} onClick={confirmSelection}>
            select
          </Button>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </div>
  );
}
