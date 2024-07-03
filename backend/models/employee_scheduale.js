const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employee_scheduale', {
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
    },
    AssignedShift: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_scheduale',
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
