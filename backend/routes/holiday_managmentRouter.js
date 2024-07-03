const express = require('express')
const { holiday_managment } = require('../models') // Adjust the path as necessary

const router = express.Router()

// Create a new holiday management entry
router.post('/', async (req, res) => {
  try {
    const { EmployeeID, Date } = req.body
    const newHoliday = await holiday_managment.create({ EmployeeID, Date })
    res.status(201).json(newHoliday)
  } catch (error) {
    console.error('Error creating holiday:', error)
    res.status(500).json({ error: 'Error creating holiday' })
  }
})

// Get all holiday management entries
router.get('/', async (req, res) => {
  try {
    const holidays = await holiday_managment.findAll()
    res.json(holidays)
  } catch (error) {
    console.error('Error fetching holidays:', error)
    res.status(500).json({ error: 'Error fetching holidays' })
  }
})

// Get a specific holiday management entry by EmployeeID and Date
router.get('/:employeeId/:date', async (req, res) => {
  try {
    const holiday = await holiday_managment.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (holiday) {
      res.json(holiday)
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error fetching holiday:', error)
    res.status(500).json({ error: 'Error fetching holiday' })
  }
})

// Update a holiday management entry
router.put('/:employeeId/:date', async (req, res) => {
  try {
    const holiday = await holiday_managment.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (holiday) {
      await holiday.save() // No fields to update in your model definition
      res.json(holiday)
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error updating holiday:', error)
    res.status(500).json({ error: 'Error updating holiday' })
  }
})

// Delete a holiday management entry
router.delete('/:employeeId/:date', async (req, res) => {
  try {
    const holiday = await holiday_managment.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (holiday) {
      await holiday.destroy()
      res.json({ message: 'Holiday deleted' })
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error deleting holiday:', error)
    res.status(500).json({ error: 'Error deleting holiday' })
  }
})

module.exports = router
