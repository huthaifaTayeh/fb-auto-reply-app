import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context';
import StyleClasses from '../../styles/Home.module.css';
import Button from '../Button';
import { updateReply, getFbProfile, getFbPage } from '../../utils/APIs';
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
  const onSubmit = async (e) => {
    e.preventDefault();
    updateReply(e.target[0]?.value);
  };

  const handleLogout = () => {
    FB.logout(() => {
      logout();
    });
  };

  return (
    <div className={StyleClasses.mainContainer}>
      <div className={StyleClasses.pageInfoContainer}>
        <div className='flex-h'>
          <img src={profile?.picture?.data?.url} width={25} height={25} />
          <h2>Hi, {profile?.name}</h2>
        </div>
        <div className={StyleClasses.selectedPageInfo}>
          <img src={page?.picture?.data?.url} width={25} height={25} />
          <span>{page?.name}</span> page is selected
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label htmlFor='reply'>
              reply message
              <input
                defaultValue={dbUser?.config?.reply}
                name='reply'
                placeholder='comment reply template'
              />
            </label>
            {/* TODO later we need input to specify keywords */}
            {/* <input/> */}
            <Button type='submit'>Save changes</Button>
          </div>
        </form>
      </div>
      <hr />
      <button className='btn disabled' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
