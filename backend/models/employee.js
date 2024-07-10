const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('employee', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    AccessLevelID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'access_level',
        key: 'ID'
      }
    },
    EmailAddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'email_UNIQUE'
    }
  }, {
    sequelize,
    tableName: 'employee',
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
        name: 'email_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'EmailAddress' }
        ]
      },
      {
        name: 'fk_emp_accl_id_id',
        using: 'BTREE',
        fields: [
          { name: 'AccessLevelID' }
        ]
      }
    ]
  })

  Employee.associate = function (models) {
    Employee.hasMany(models.availability, { foreignKey: 'EmployeeID' })
  }

  Employee.associate = function (models) {
    Employee.hasMany(models.employee_scheduale, { foreignKey: 'EmployeeID' })
  }

  return Employee
}
