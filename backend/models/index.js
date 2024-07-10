const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const ServerConfig = require('../config/ServerConfig')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = new ServerConfig({
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'employee_management_db',
  dialect: 'mysql'
})
const sequelize = config.sequelize

const db = {}

// Read and define models
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// Export db with sequelize instance
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
