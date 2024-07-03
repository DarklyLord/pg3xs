const express = require('express')
const { availability } = require('../models') // Adjust the path as necessary

const router = express.Router()

// Create a new availability entry
router.post('/', async (req, res) => {
  try {
    const { EmployeeID, Date, Morning, Afternoon, Evening } = req.body
    const newAvailability = await availability.create({ EmployeeID, Date, Morning, Afternoon, Evening })
    res.status(201).json(newAvailability)
  } catch (error) {
    console.error('Error creating availability:', error)
    res.status(500).json({ error: 'Error creating availability' })
  }
})

// Get all availability entries
router.get('/', async (req, res) => {
  try {
    const availabilityEntries = await availability.findAll()
    res.json(availabilityEntries)
  } catch (error) {
    console.error('Error fetching availability entries:', error)
    res.status(500).json({ error: 'Error fetching availability entries' })
  }
})

// Get a specific availability entry by EmployeeID and Date
router.get('/:employeeId/:date', async (req, res) => {
  try {
    const availabilityEntry = await availability.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (availabilityEntry) {
      res.json(availabilityEntry)
    } else {
      res.status(404).json({ error: 'Availability entry not found' })
    }
  } catch (error) {
    console.error('Error fetching availability entry:', error)
    res.status(500).json({ error: 'Error fetching availability entry' })
  }
})

// Update an availability entry
router.put('/:employeeId/:date', async (req, res) => {
  try {
    const { Morning, Afternoon, Evening } = req.body
    const availabilityEntry = await availability.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (availabilityEntry) {
      availabilityEntry.Morning = Morning
      availabilityEntry.Afternoon = Afternoon
      availabilityEntry.Evening = Evening
      await availabilityEntry.save()
      res.json(availabilityEntry)
    } else {
      res.status(404).json({ error: 'Availability entry not found' })
    }
  } catch (error) {
    console.error('Error updating availability entry:', error)
    res.status(500).json({ error: 'Error updating availability entry' })
  }
})

// Delete an availability entry
router.delete('/:employeeId/:date', async (req, res) => {
  try {
    const availabilityEntry = await availability.findOne({
      where: {
        EmployeeID: req.params.employeeId,
        Date: req.params.date
      }
    })
    if (availabilityEntry) {
      await availabilityEntry.destroy()
      res.json({ message: 'Availability entry deleted' })
    } else {
      res.status(404).json({ error: 'Availability entry not found' })
    }
  } catch (error) {
    console.error('Error deleting availability entry:', error)
    res.status(500).json({ error: 'Error deleting availability entry' })
  }
})

module.exports = router
