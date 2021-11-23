// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const choreSchema = new Schema({
  houseID: { type: String, required: true },
  assignedTo: { type: String, required: true }, // username
  completed: { type: Boolean, required: false },
  task: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = model('Chore', choreSchema)
