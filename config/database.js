module.exports = {
  dialect:  process.env.FLS_DB_DIALECT  || 'postgres',
  host:     process.env.FLS_DB_HOST     || 'localhost',
  port:     process.env.FLS_DB_PORT     || '5432',
  name:     process.env.FLS_DB_NAME     || 'faeries',
  user:     process.env.FLS_DB_USER     || 'postgres',
  password: process.env.FLS_DB_PASSWORD || '',
}