const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('availability', {
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
    Morning: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    Afternoon: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    Evening: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'availability',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmployeeID" },
          { name: "Date" },
        ]
      },
      {
        name: "fk_emp_ava_id_id",
        using: "BTREE",
        fields: [
          { name: "EmployeeID" },
        ]
      },
    ]
  });
};
