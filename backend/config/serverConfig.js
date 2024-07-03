// config/ServerConfig.js
const { Sequelize } = require('sequelize')

class ServerConfig {
  constructor ({ HOST, USER, PASSWORD, DB, dialect }) {
    this.sequelize = new Sequelize(DB, USER, PASSWORD, {
      host: HOST,
      dialect: dialect
    })
  }
}
module.exports = ServerConfig
