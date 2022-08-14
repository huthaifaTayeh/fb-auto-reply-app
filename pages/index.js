import StyleClasses from '../styles/Home.module.css';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { baseURL } from '../config';
import Link from 'next/link';

const FinalPage = (props) => {
  const { dbUser, fbUser } = props;

  // TODO we need user and facebook info from facebook
  // we can use 'me' request to access info
  useEffect(() => {}, []);

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
        <h2>Hi, FixedName</h2>
        <div className={StyleClasses.selectedPageInfo}>
          <span>FixedPageName</span> page is selected
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
        <Link href='/login'>logout</Link>
      </div>
    </div>
  );
};
export default FinalPage;
