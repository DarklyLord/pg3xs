const express = require('express')
const { employee_scheduale } = require('../models') // Adjust the path as necessary

const router = express.Router()

// Create a new employee schedule
router.post('/', async (req, res) => {
  try {
    const { EmployeeID, Date, AssignedShift } = req.body
    const newSchedule = await employee_scheduale.create({ EmployeeID, Date, AssignedShift })
    res.status(201).json(newSchedule)
  } catch (error) {
    console.error('Error creating schedule:', error)
    res.status(500).json({ error: 'Error creating schedule' })
  }
})

// Get all employee schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await employee_scheduale.findAll()
    res.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    res.status(500).json({ error: 'Error fetching schedules' })
  }
})

// Get a specific schedule by EmployeeID and Date
router.get('/:employeeId/:date', async (req, res) => {
  try {
    const schedule = await employee_scheduale.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (schedule) {
      res.json(schedule)
    } else {
      res.status(404).json({ error: 'Schedule not found' })
    }
  } catch (error) {
    console.error('Error fetching schedule:', error)
    res.status(500).json({ error: 'Error fetching schedule' })
  }
})

// Update an employee schedule
router.put('/:employeeId/:date', async (req, res) => {
  try {
    const { AssignedShift } = req.body
    const schedule = await employee_scheduale.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (schedule) {
      schedule.AssignedShift = AssignedShift
      await schedule.save()
      res.json(schedule)
    } else {
      res.status(404).json({ error: 'Schedule not found' })
    }
  } catch (error) {
    console.error('Error updating schedule:', error)
    res.status(500).json({ error: 'Error updating schedule' })
  }
})

// Delete an employee schedule
router.delete('/:employeeId/:date', async (req, res) => {
  try {
    const schedule = await employee_scheduale.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (schedule) {
      await schedule.destroy()
      res.json({ message: 'Schedule deleted' })
    } else {
      res.status(404).json({ error: 'Schedule not found' })
    }
  } catch (error) {
    console.error('Error deleting schedule:', error)
    res.status(500).json({ error: 'Error deleting schedule' })
  }
})

module.exports = router
