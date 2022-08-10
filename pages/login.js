import React from 'react'
import StyleClasses from "../styles/Home.module.css";
import axios from "axios";
import {baseURL} from "../config";
import { withRouter } from 'next/router'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  async findUser(fb_user_id) {
    try {
      // make api call to get already existing user or create one
      const res = await axios.get(
        `${baseURL}/api/users?fb_user_id=${fb_user_id}`
      );
      const {user, access_token} = res.data.data;
      localStorage.setItem('access_token', access_token);
      return user;
    } catch (err) {
      // alert('something went wrong, check logs');
      console.log(err);
    }
  };

  async handleLogin() {
    FB.login(
      async ({ authResponse, status }) => {
        if (status === 'connected') {
          const { accessToken, userID } = authResponse;
          // check if user is in Database
          const foundUser = await this.findUser(userID);
          if (foundUser) {
            await this.props.router.push('/confirmPage');
          } else {
            await this.props.router.push('/')
          }
        } else {
          // The person is not logged into your webpage or we are unable to tell.
          alert("Unexpected error happened!")
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
  render() {
    return (
      <div className={StyleClasses.mainContainer}>
        <div className={StyleClasses.fbLoginBtnContainer}>
          <div className={StyleClasses.greyCircle} />
          <button onClick={this.handleLogin}>login with facebook</button>
        </div>
      </div>
    );

  }
}
export default withRouter(Login)