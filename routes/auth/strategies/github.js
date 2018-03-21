const config = CONFIG.STRATEGIES.GITHUB

module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (callbackURL) => {
    if (config.client_id && config.client_secret) {
      return {
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    let avatar
    try {
      avatar = JSON.parse(profile._raw).avatar_url
    } catch (error) {}
    const {username, displayName} = profile
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username,
        name: displayName,
        provider: 'github',
        photo: avatar
      }
    })
  }
}
