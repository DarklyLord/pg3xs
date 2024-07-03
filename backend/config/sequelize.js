// config/sequelize.js
const ServerConfig = require('./ServerConfig')

const db = new ServerConfig({
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'db_test',
  dialect: 'mysql'
})

const sequelize = db.sequelize

module.exports = sequelize
