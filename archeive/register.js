import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL, mockPages, testingMode } from '../config';
import Router from 'next/router';
import StyleClasses from '../styles/Home.module.css';
import Button from '../components/Button';
import {
  createUser,
  getFbPages,
  getSubscribedPages,
  subscribedPageToApp,
  subscribePageToApp,
} from '../utils/APIs';

export default function Home({ dbUser, fbUser, setDbUser }) {
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
        page: fetchedPages.data,
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
      // we used location instead of router in order to update the state by _app
      // lazzy solution

      location.href = '/';
    } else {
      alert('fail creating new user');
    }
  }

  const handleLogout = () => {
    FB.logout(() => {
      location.href = '/login';
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
