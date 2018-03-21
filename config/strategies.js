module.exports = {
  // Necessary to create your own Google OAuth application.
  GOOGLE: {
    client_id:      process.env.FLS_GOOGLE_CLIENTID,
    client_secret:  process.env.FLS_GOOGLE_CLIENTSECRET
  },
  // Necessary to create your own Facebook OAuth application.
  FACEBOOK: {
    app_id:      process.env.FLS_FACEBOOK_APPID,
    app_secret:  process.env.FLS_FACEBOOK_APPSECRET
  },
  // Necessary to create your own Github OAuth application.
  GITHUB: {
    client_id:      process.env.FLS_GITHUB_CLIENTID,
    client_secret:  process.env.FLS_GITHUB_CLIENTSECRET
  },
}