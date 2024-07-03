var DataTypes = require('sequelize').DataTypes
var _access_level = require('./access_level')
var _availability = require('./availability')
var _employee = require('./employee')
var _employee_scheduale = require('./employee_scheduale')
var _holiday_managment = require('./holiday_managment')

function initModels (sequelize) {
  var access_level = _access_level(sequelize, DataTypes)
  var availability = _availability(sequelize, DataTypes)
  var employee = _employee(sequelize, DataTypes)
  var employee_scheduale = _employee_scheduale(sequelize, DataTypes)
  var holiday_managment = _holiday_managment(sequelize, DataTypes)

  employee.belongsTo(access_level, { as: 'AccessLevel', foreignKey: 'AccessLevelID'})
  access_level.hasMany(employee, { as: 'employees', foreignKey: 'AccessLevelID'})
  availability.belongsTo(employee, { as: 'Employee', foreignKey: 'EmployeeID'})
  employee.hasMany(availability, { as: 'availabilities', foreignKey: 'EmployeeID'})
  employee_scheduale.belongsTo(employee, { as: 'Employee', foreignKey: 'EmployeeID'})
  employee.hasMany(employee_scheduale, { as: 'employee_scheduales', foreignKey: 'EmployeeID'})
  holiday_managment.belongsTo(employee, { as: 'Employee', foreignKey: 'EmployeeID'})
  employee.hasMany(holiday_managment, { as: 'holiday_managments', foreignKey: 'EmployeeID'})

  return {
    access_level,
    availability,
    employee,
    employee_scheduale,
    holiday_managment
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
