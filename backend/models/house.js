// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const houseSchema = new Schema({
  address: { type: String, required: true },
  members: [String],
  creator: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = model('House', houseSchema)
