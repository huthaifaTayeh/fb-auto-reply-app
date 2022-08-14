const port = 8080;
export const baseURL = `https://fb-page-pr.herokuapp.com`;
// export const baseURL = `http://localhost:${port}`;

export const testingMode = true;

const mockLoginResponse = {
  accessToken:
    'EAAFRGmaPhEEBAOHRrDKrpS63Mq08CwClSTbaKvRizhWjt5gHey8TX9HfeepdhUb1yyuPZBqVhy7ZAx1aOUNYsJNiIUKoXZBvbJPtRJ3indkMEjIvtb9aCZAandWvljsQX392LIp0dNjK2GxzRC0E4KYXnvJjXP0urwgidodbMlf2rpOM4XWixXr2EhkirmszmTn9tfDouEBprhblzite',
  userID: '188291786871765',
};
export const mockState = {
  dbUser: null,
  fbUser: mockLoginResponse,
  isAuthenticating: false,
};

export const mockPages = [
  {
    id: 1,
    name: 'hatem page',
    access_token: '2347828937452398dshf',
  },
];

export const appName = 'vetrina-bot';

export const loginPermissionScope = [
  // default
  'public_profile',
  'email',
  // to send message from server
  'pages_messaging',
  // to list user pages and able to subscripe to webhook
  'pages_show_list',
  'pages_manage_metadata',
  'pages_read_engagement',
];
