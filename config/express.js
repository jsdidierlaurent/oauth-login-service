let port = process.env.PORT || '3000'

module.exports = {
  port,
  protocol:   process.env.FLS_SUBDOMAIN ? 'https:/' : 'http:/',
  subDomain:  process.env.FLS_SUBDOMAIN || `localhost:${port}`,
}