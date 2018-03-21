const config = CONFIG.STRATEGIES.GOOGLE

module.exports = {
  Ctor: require('passport-google-oauth20').Strategy,
  getConfig: (callbackURL) => {
    if (config.client_id && config.client_secret) {
      return {
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['profile', 'openid', 'email']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    const {id, displayName, emails, photos = []} = profile
    let email = (emails.length > 0) ? emails[0].value : undefined
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        id,
        provider: 'google',
        username: displayName,
        name: displayName,
        email,
        photo: photos[0] ? photos[0].value : null
      }
    })
  }
}
