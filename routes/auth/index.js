const express = require('express')
const passport = require('passport')

const logger = require("$utils/logger");
const controller = require("$controller");

// Init strategies
const authRoute = 'auth'
const authRootUrl = CONFIG.EXPRESS.protocol + '/' + CONFIG.EXPRESS.subDomain + '/' + authRoute
const strategies = require('./strategies')(authRootUrl)
logger.info(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`)

strategies.forEach(strategy => {
  passport.use(new strategy.Ctor(strategy.config, strategy.toUser))
  logger.info(`- Using login with "${strategy.type}" strategy`)
})

// Setup passport and express.Router
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const router = express.Router()
router.use(passport.initialize())

if (strategies.length > 0) {
  // /auth/(google/facebook ...)
  router.get(strategies.map(strategy => `/${strategy.type}`), (req, res, next) => {
    const type = req.path.split('/')[1]
    const strategy = strategies.find(strategy => strategy.type === type)
    const opts = {}
    if (strategy.preHook) {
      strategy.preHook(req, opts)
    }
    passport.authenticate(type, opts)(req, res, next)
  })

  // /auth/(google/facebook ...)/callback
  router.get(strategies.map(strategy => `/${strategy.type}/callback`), (req, res, next) => {
    const type = req.path.split('/')[1]
    passport.authenticate(type, (error, oauth_user) => {
      if (!oauth_user || error) {
        // Error while callback call
        logger.error(error)
        res.status(500).send({error: error || 'No user was returned'})
      } else {
        controller.authenticateOAuthUser(oauth_user)
          .then((response) => {
            res.status(200).json(response)
          })
          .catch((error) => {
            logger.error(error)
            res.status(200).json(error)
          })
      }
    })(req, res)
  })
}



module.exports = router