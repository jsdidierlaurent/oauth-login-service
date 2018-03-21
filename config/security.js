module.exports = {
  jwt_secret: process.env.FLS_JWT_SECRET,
  jwt_expires_in: process.env.FLS_JWT_EXPIRES_IN || '1d'
}