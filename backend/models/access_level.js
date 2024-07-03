const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('access_level', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: 'name_UNIQUE'
    },
    Description: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'access_level',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'ID' }
        ]
      },
      {
        name: 'name_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'Name' }
        ]
      }
    ]
  })
}
