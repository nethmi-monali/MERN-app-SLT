const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({

  customerID: {
    type: String,
    required: true,
    unique:true
  },

  customerName: {
    type: String,
    required: true
  },

  customerNIC: {
    type: String,
    required: true,
    unique:true
  },

  customerEmail: {
    type: String,
    required: true
  },

  customerNumber: {
    type: Number,
    required: true
  },
  
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)