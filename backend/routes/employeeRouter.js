const express = require('express')
const { employee } = require('../models') // Adjust the path as necessary

const router = express.Router()

// Create a new employee
router.post('/', async (req, res) => {
  try {
    const { FirstName, LastName, Password, AccessLevelID, EMailAdresse } = req.body
    const newEmployee = await employee.create({ FirstName, LastName, Password, AccessLevelID, EMailAdresse })
    res.status(201).json(newEmployee)
  } catch (error) {
    console.error('Error creating employee:', error)
    res.status(500).json({ error: 'Error creating employee' })
  }
})

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await employee.findAll()
    res.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    res.status(500).json({ error: 'Error fetching employees' })
  }
})

// Get a specific employee by ID
router.get('/:id', async (req, res) => {
  try {
    const emp = await employee.findByPk(req.params.id)
    if (emp) {
      res.json(emp)
    } else {
      res.status(404).json({ error: 'Employee not found' })
    }
  } catch (error) {
    console.error('Error fetching employee:', error)
    res.status(500).json({ error: 'Error fetching employee' })
  }
})

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const { FirstName, LastName, Password, AccessLevelID, EMailAdresse } = req.body
    const emp = await employee.findByPk(req.params.id)
    if (emp) {
      emp.FirstName = FirstName
      emp.LastName = LastName
      emp.Password = Password
      emp.AccessLevelID = AccessLevelID
      emp.EMailAdresse = EMailAdresse
      await emp.save()
      res.json(emp)
    } else {
      res.status(404).json({ error: 'Employee not found' })
    }
  } catch (error) {
    console.error('Error updating employee:', error)
    res.status(500).json({ error: 'Error updating employee' })
  }
})

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const emp = await employee.findByPk(req.params.id)
    if (emp) {
      await emp.destroy()
      res.json({ message: 'Employee deleted' })
    } else {
      res.status(404).json({ error: 'Employee not found' })
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
    res.status(500).json({ error: 'Error deleting employee' })
  }
})

module.exports = router
