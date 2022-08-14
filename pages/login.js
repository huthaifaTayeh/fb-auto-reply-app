import React from 'react';
import StyleClasses from '../styles/Home.module.css';
import axios from 'axios';
import { baseURL } from '../config';
import Router from 'next/router';
import Link from 'next/link';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  async handleLogin() {
    FB.login(
      async ({ authResponse, status }) => {
        if (status === 'connected') {
          const { accessToken, userID } = authResponse;
          // check if user is in Database
          const foundUser = await findUser(userID);
          if (foundUser) {
            await Router.push('/');
          } else {
            location.href = '/register';
            await Router.push('/register');
          }
        } else {
          // The person is not logged into your webpage or we are unable to tell.
          alert('Unexpected error happened!');
        }
      },
      {
        scope: [
          '',
          'pages_messaging',
          'pages_read_engagement',
          'pages_show_list',
          'pages_manage_metadata',
          'public_profile',
          'email',
        ],
      }
    );
  }

  render() {
    return (
      <div className={StyleClasses.mainContainer}>
        <div className={StyleClasses.fbLoginBtnContainer}>
          <Link href={'/'}>
            <div className={StyleClasses.greyCircle} />
          </Link>
          <button onClick={this.handleLogin}>login with facebook</button>
        </div>
      </div>
    );
  }
}
export default Login;

async function findUser(fb_user_id) {
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
}
