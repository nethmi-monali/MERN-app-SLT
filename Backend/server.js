// Require necessary packages
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Require route files
const customerRoute = require('./customer/customerRoute')
const requestRoute = require('./request/requestRoute')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/customers', customerRoute)
app.use('/api/requests', requestRoute)

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database')
    // Listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
