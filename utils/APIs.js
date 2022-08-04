const axios = require('axios');

export const getFbPages = async (userID, accessToken) => {
  return new Promise((resolve, reject) => {

    axios.get(`https://graph.facebook.com/v14.0/${userID}/accounts?access_token=${accessToken}`).then((response) => resolve(response.data)).catch((err) => reject(err));
    // request({
    //   "uri": "https://graph.facebook.com/v7.0/" + userID + "/accounts",
    //   "qs": { "access_token": accessToken },
    //   "method": "GET",
    // }, (err, res, body) => {
    //   if (!err) {
    //     console.log('response is !  ', res, "body is ", body);
    //
    //   } else {
    //     console.error("Unable to send message:" + err);
    //
    //   }
    // });
  })

}