
process.env.APP_PORT=3000
process.env.APP_URL="http://localhost:3000"
process.env.DB_HOST='localhost'
process.env.DB_PORT=5432
process.env.DB_USERNAME='invent_analytics_case_user'
process.env.DB_PASSWORD='1234@Ahmet'
process.env.DB_DATABASE='invent_analytics_db'
process.env.NODE_ENV='development'

module.exports = {
  "testEnvironment": "node",
  "preset": "ts-jest",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ]
}