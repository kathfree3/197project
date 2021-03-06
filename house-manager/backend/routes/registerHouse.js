/** ******************************************
 * Routes under the /registerhouse prefix
 * Used to handle creating a new house
 * ****************************************** */

// package imports
const express = require('express')

// local imports
const House = require('../models/house')
const Roomate = require('../models/roommate')

const router = express.Router()

// helper function
const addHouseToUser = async (req, res, username, id) => {
  req.session.house = id
  const roomie = await Roomate.findOne({ username })
  roomie.houseID = id
  roomie.save(err => (err ? res.send('Issue adding house to user') : res.send({ success: true })))
}

// can only create a house
router.post('/create', async (req, res) => {
  const { address, password } = req.body
  const { username: creator } = req.session
  const members = [creator]
  try {
    const newHouse = await House.create({
      address, members, creator, password,
    })
    addHouseToUser(req, res, creator, newHouse._id)
  } catch (err) {
    res.send('Error creating house')
  }
})

// get houses in system
router.get('/joinoptions', async (req, res) => {
  try {
    const options = await House.find()
    res.send(options)
  } catch (err) {
    res.send('error of some sorts')
  }
})

// request to join a house
router.post('/join', async (req, res) => {
  const { _id, password } = req.body
  const { username } = req.session
  try {
    const house = await House.findById({ _id })
    if (!house) {
      res.send("house doesn't exist")
    } else {
      const { password: housePWD } = house
      if (housePWD === password) {
        house.members.push(username)
        house.save()
        addHouseToUser(req, res, username, _id)
      } else {
        res.send('Wrong Password')
      }
    }
  } catch (err) {
    res.send('Error joining house')
  }
})

module.exports = router
