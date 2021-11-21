// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const laundrySchema = new Schema({
  houseID: { type: String, required: true }, // whose house is this for
  type: { type: String, required: true }, // washer or dryer
  duration: { type: Number, required: true }, // length in minutes
  inUse: { type: Boolean, required: true, default: false },
  timeCompleted: { type: Date, required: true, default: Date.now }, // what time will it be over
})

module.exports = model('Laundry', laundrySchema)
