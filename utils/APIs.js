import { appName, baseURL } from '../config';

const axios = require('axios');

export const getFbPages = async (userID, accessToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://graph.facebook.com/v14.0/${userID}/accounts?access_token=${accessToken}`
      )
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
};

export async function findUser(fb_user_id) {
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

export const getSubscribedPages = async (pageID, accessTokn) => {
  return axios.get(
    `https://graph.facebook.com/v14.0/${pageID}/subscribed_apps?access_token=${accessTokn}`
  );
};
export const subscribedPageToApp = async (pageID, accessTokn) => {
  return axios.post(
    `https://graph.facebook.com/v14.0/${pageID}/subscribed_apps?access_token=${accessTokn}&subscribed_fields=feed`
  );
};

export async function createUser(
  fb_user_token,
  fb_user_id,
  fb_page_id,
  fb_page_token
) {
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
}

export async function subscribePageToApp(pageID, pageAccessToken) {
  try {
    const subscribedApps =
      (await getSubscribedPages(pageID, pageAccessToken)) ?? [];
    const isSubbed = subscribedApps.some((app) => app.name === appName);
    if (!isSubbed) {
      await subscribedPageToApp(pageID, pageAccessToken);
    }
  } catch (e) {
    console.log(e);
  }
}
