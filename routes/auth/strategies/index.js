const scopeDecoder = require('$utils/scopeDecoder')

const strategies = {
  github: require('./github'),
  google: require('./google'),
  facebook: require('./facebook'),
}

const isConfigured = strategy => strategy.config

module.exports = (rootUrl) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    const callbackURL = `${rootUrl}/${type}/callback`
    strategy.config = strategy.getConfig(callbackURL)
    if (strategy.config && strategy.config.scope) {
      strategy.config.scope = scopeDecoder(strategy.config.scope)
    }
    strategy.type = type
    return strategy
  })
  .filter(strategy => isConfigured(strategy))
