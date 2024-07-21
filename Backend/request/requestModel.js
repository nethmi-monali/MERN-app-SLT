const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({

  requestID: {
    type: String,
    required: true,
    unique:true,
  },

  customerName: {
    type: String,
    required: true
  },

  requestDescription: {
    type: String,
    required: true
  },

  requestStatus: {
    type: Number,
    required: true
  },
  
}, { timestamps: true })

module.exports = mongoose.model('Request', requestSchema)