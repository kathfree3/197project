// package imports
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const roomateSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true}
})

module.exports = model('Roomate', roomateSchema)
