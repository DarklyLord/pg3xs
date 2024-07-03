const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { sequelize } = require('../models') // Adjust the path as necessary
const accessLevelRoutes = require('../routes/access_levelsRouter') // Adjust the path as necessary
const employeeRoutes = require('../routes/employeeRouter') // Adjust the path as necessary
const availabilityRoutes = require('../routes/availabilityRouter') // Adjust the path as necessary
const employeeScheduleRoutes = require('../routes/employee_schedualeRouter') // Adjust the path as necessary
const holidayManagementRoutes = require('../routes/holiday_managmentRouter') // Add this line

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))

// Routes
app.use('/access_levels', accessLevelRoutes)
app.use('/employees', employeeRoutes)
app.use('/availabilities', availabilityRoutes)
app.use('/employee_scheduales', employeeScheduleRoutes)
app.use('/holiday_managments', holidayManagementRoutes) // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong!' })
})

// Sync models and start server
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!')
  app.listen(3011, () => {
    console.log('Server is running on port 3011')
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})
