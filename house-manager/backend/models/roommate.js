// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const roommateSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  houseID: String,
})

module.exports = model('Roommate', roommateSchema)
