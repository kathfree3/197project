// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const houseSchema = new Schema({
  address: { type: String, required: true },
  members: [String],
  creator: { type: String, required: true },
  password: { type: String, required: true },
  laundry: { type: [String], default: [] }, // list of IDs
})

module.exports = model('House', houseSchema)
