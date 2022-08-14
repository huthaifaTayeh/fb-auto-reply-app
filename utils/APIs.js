import { appName, baseURL } from '../config';

const axios = require('axios');

/* 
{
   "data": [
      {
         "access_token": "EAAFRGmaPhEEBAFM82ZCtqnES6lXoV7meR0GbYLcdoAHAEycC4i5ZBkm6ZC9BCD0czAeqhZCwLZAuceQBJm8KbbcJHF8dVT0FsuIpUPmlony6mPRlzdOkhonmzZB1OngTbijOtwO5vtFz1FnUx5QGuG2fHtltKRhKG85w7ugR1wNHLJFoHdeztIBbdvEx6HHBlxJzv6ZCgdtvAqraX5jc10V",
         "category": "Beauty Salon",
         "category_list": [
            {
               "id": "199236533423806",
               "name": "Beauty Salon"
            }
         ],
         "name": "My testing page",
         "id": "100935909407988",
         "tasks": [
            "ANALYZE",
            "ADVERTISE",
            "MESSAGING",
            "MODERATE",
            "CREATE_CONTENT",
            "MANAGE"
         ]
      }
   ],
   "paging": {
      "cursors": {
         "before": "MTAwOTM1OTA5NDA3OTg4",
         "after": "MTAwOTM1OTA5NDA3OTg4"
      }
   }
}
*/
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

export const getFbProfile = async () => {
  return new Promise((resolve, reject) => {
    FB.api('/me', 'GET', { fields: 'id,name,picture' }, function (response) {
      resolve(response);
      // Insert your code here
    });
  });
};

export const getFbPage = async (pageId) => {
  return new Promise((resolve, reject) => {
    FB.api(
      '/' + pageId,
      'GET',
      { fields: 'id,name,picture' },
      function (response) {
        resolve(response);
        // Insert your code here
      }
    );
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

export const updateReply = async (reply) => {
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
    console.log(err);
  }
};
