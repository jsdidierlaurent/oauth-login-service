const jwt = require('jsonwebtoken')
const models = require("$models")

module.exports.authenticateOAuthUser = function(oauthInformations) {
  // Find db_oauth or create one then create db_user
  return findOrCreateOAuthInDB(oauthInformations)
    .spread((db_oauth, created) => {
      // Existing user
      if (!created) {
        let user_uid = db_oauth.getDataValue('oauth_user_uid')

        // TODO : Update oauth data if nessecary

        return findUser(user_uid)
      } 
      // New user
      else {
        // TODO : Nickname and right managment
        let user_nickname = ''
        let user_rights = []

        return createUser(user_nickname, user_rights)
      }
    })
    // Update db_oauth with user_uid
    .then((db_user) => {
      return updateOAuthInDB(oauthInformations ,db_user.getDataValue('user_uid'))
        .then(() => {
          // Update db_oauth ok, return db_user
          return db_user
        })
    })
    .then((db_user) => {
      // Create payload for jwt
      let payload = {
        uid: db_user.getDataValue('user_uid'),
        name: oauthInformations.profile.name,
        nickname: db_user.getDataValue('user_nickname'),
        avatar: oauthInformations.profile.photo,
        rights: db_user.getDataValue('user_rights'),
      }

      console.log(payload)

      return {jwt: getJWT(payload)}
    })
}

/**
 * Find or create entry in tbl_account_oauths for given oauthInformations for passport
 */
function findOrCreateOAuthInDB(oauthInformations) {
  return models.tbl_account_oauths
    .findOrCreate({
      where: {
        oauth_id: oauthInformations.profile.id, 
        oauth_provider: oauthInformations.profile.provider,
      }, 
      defaults: {
        oauth_access_token: oauthInformations.accessToken,
        oauth_email: oauthInformations.profile.email,
        oauth_name: oauthInformations.profile.name,
      }
    })
}

/**
 * Find or create entry in tbl_account_oauths for given db_oauth for passport
 */
function updateOAuthInDB(oauthInformations, user_uid) {
  return models.tbl_account_oauths
    .update({
      oauth_access_token: oauthInformations.accessToken,
      oauth_email: oauthInformations.profile.email,
      oauth_name: oauthInformations.profile.name,
      oauth_user_uid: user_uid
    },{
      where: {
        oauth_id: oauthInformations.profile.id, 
        oauth_provider: oauthInformations.profile.provider,
      }
    })
}

/**
 * Find entry in tbl_account_users for given uid
 */
function findUser(user_uid) {
  return models.tbl_account_users.findById(user_uid)
}

/**
 * Find entry in tbl_account_users for given uid
 */
function createUser(user_nickname, user_right) {
  return models.tbl_account_users.create({
    user_nickname, 
    user_right
  })
}

/**
 * Create JWT with given payload
 * @see : https://jwt.io/
 */
function getJWT(payload) {
  let expiresIn = parseInt(CONFIG.SECURITY.jwt_expires_in)
  return jwt.sign(payload, CONFIG.SECURITY.jwt_secret, {expiresIn})
}