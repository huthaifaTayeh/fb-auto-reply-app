import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context';
import StyleClasses from '../../styles/Home.module.css';
import Button from '../Button';
import { updateReply, getFbProfile, getFbPage } from '../../utils/APIs';
import MessageRepliesFrom from '../MessageRepliesFrom';
// renders when user login and have page selected
// fetches user profile from facebook
// actions: change reply template, logout
export default function HomePage() {
  const { dbUser, fbUser, logout } = useAuth();
  const [profile, setProfile] = useState();
  const [page, setPage] = useState();
  console.log(page, profile);

  // TODO fetch user data from facebook ( name and image )
  useEffect(() => {
    fetchFbProfile();
    fetchFbPage();
  }, []);

  const fetchFbProfile = async () => {
    try {
      const res = await getFbProfile();
      setProfile(res);
    } catch (err) {}
  };
  const fetchFbPage = async () => {
    try {
      const res = await getFbPage(dbUser.fb_page_id);
      setPage(res);
    } catch (err) {}
  };

  const handleLogout = () => {
    FB.logout(() => {
      logout();
    });
  };

  return (
    <div className={StyleClasses.mainContainer}>
      <img src='/logo_white.png' width={55} height={55} />

      <div className={StyleClasses.pageInfoContainer}>
        <div className='flex-v justify-start full-width'>
          <div className='flex-h align-center gap-1'>
            <img src={profile?.picture?.data?.url} width={25} height={25} />
            <h2>Hi, {profile?.name}</h2>
          </div>
          <div className='flex-h align-center gap-1'>
            {/* <img src={page?.picture?.data?.url} width={25} height={25} /> */}
            selected page: <span>{page?.name}</span>
          </div>
        </div>
        <div className='mv-3'>
          <MessageRepliesFrom />
        </div>
      </div>
      <hr />
      <button className='btn disabled' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
