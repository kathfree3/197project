const express = require('express')

const House = require('../models/house')
const Roomate = require('../models/roommate')

const router = express.Router()

// helper function
const addHouseToUser = async (req, res, username, id) => {
  req.session.house = id
  const roomie = await Roomate.findOne({ username })
  roomie.houseID = id
  roomie.save(err => {
    if (err) {
      res.send('Issue adding house field to user')
    } else {
      res.send({ success: true })
    }
  })
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

router.get('/joinoptions', async (req, res) => {
  try {
    const options = await House.find()
    res.send(options)
  } catch (err) {
    res.send('error of some sorts')
  }
})

router.post('/join', async (req, res) => {
  const { _id, password } = req.body
  const { username } = req.session
  try {
    const house = await House.findById({ _id })
    if (!house) {
      res.send("house doesn't exist")
    }
    if (house.password === password) {
      house.members.push(username)
      house.save(err => {
        if (err) {
          res.send('issue with joining house')
        } else {
          req.session.house = _id
          addHouseToUser(req, res, username, _id)
        }
      })
    }
  } catch (err) {
    res.send('Error joining house')
  }
})

module.exports = router
