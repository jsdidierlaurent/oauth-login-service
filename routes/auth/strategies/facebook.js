const config = CONFIG.STRATEGIES.FACEBOOK

module.exports = {
  Ctor: require('passport-facebook').Strategy,
  getConfig: (callbackURL) => {
    if (config.app_id && config.app_secret) {
      return {
        clientID: config.app_id,
        clientSecret: config.app_secret,
        callbackURL,
        profileFields: ['displayName', 'name', 'photos']
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    let name
    if (profile.name) {
      if (profile.name.givenName && profile.name.familyName) {
        name = `${profile.name.givenName} ${profile.name.familyName}`
      } else if (profile.name.givenName) {
        name = profile.name.givenName
      } else if (profile.name.familyName) {
        name = profile.name.familyName
      }
    }
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        username: profile.displayName,
        provider: 'facebook',
        name,
        photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null
      }
    })
  }
}
