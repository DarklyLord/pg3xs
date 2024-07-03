const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('holiday_managment', {
    EmployeeID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'ID'
      }
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'holiday_managment',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'EmployeeID' },
          { name: 'Date' }
        ]
      }
    ]
  })
}
