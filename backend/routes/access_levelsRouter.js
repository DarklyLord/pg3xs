const express = require('express')
const { access_level } = require('../models') // Adjust the path as necessary

const router = express.Router()

// Create a new access level
router.post('/', async (req, res) => {
  try {
    const { Name, Description } = req.body
    const newAccessLevel = await access_level.create({ Name, Description })
    res.status(201).json(newAccessLevel)
  } catch (error) {
    console.error('Error creating access level:', error)
    res.status(500).json({ error: 'Error creating access level' })
  }
})

// Get all access levels
router.get('/', async (req, res) => {
  try {
    const accessLevels = await access_level.findAll()
    res.json(accessLevels)
  } catch (error) {
    console.error('Error fetching access levels:', error)
    res.status(500).json({ error: 'Error fetching access levels' })
  }
})

// Get a specific access level by ID
router.get('/:id', async (req, res) => {
  try {
    const accessLevel = await access_level.findByPk(req.params.id)
    if (accessLevel) {
      res.json(accessLevel)
    } else {
      res.status(404).json({ error: 'Access level not found' })
    }
  } catch (error) {
    console.error('Error fetching access level:', error)
    res.status(500).json({ error: 'Error fetching access level' })
  }
})

// Update an access level
router.put('/:id', async (req, res) => {
  try {
    const { Name, Description } = req.body
    const accessLevel = await access_level.findByPk(req.params.id)
    if (accessLevel) {
      accessLevel.Name = Name
      accessLevel.Description = Description
      await accessLevel.save()
      res.json(accessLevel)
    } else {
      res.status(404).json({ error: 'Access level not found' })
    }
  } catch (error) {
    console.error('Error updating access level:', error)
    res.status(500).json({ error: 'Error updating access level' })
  }
})

// Delete an access level
router.delete('/:id', async (req, res) => {
  try {
    const accessLevel = await access_level.findByPk(req.params.id)
    if (accessLevel) {
      await accessLevel.destroy()
      res.json({ message: 'Access level deleted' })
    } else {
      res.status(404).json({ error: 'Access level not found' })
    }
  } catch (error) {
    console.error('Error deleting access level:', error)
    res.status(500).json({ error: 'Error deleting access level' })
  }
})

module.exports = router
