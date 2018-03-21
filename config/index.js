CONFIG = {}

CONFIG.env          = process.env.NODE_ENV || 'development'

CONFIG.EXPRESS      = require('./express')
CONFIG.DATABASE     = require('./database')
CONFIG.SECURITY     = require('./security')
CONFIG.STRATEGIES   = require('./strategies')

// Check before starting service
if (!CONFIG.SECURITY.jwt_secret) {
  console.error('no FLS_JWT_SECRET env variable specified')
  process.exit(1)
}