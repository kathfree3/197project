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
      res.send('issue with adding house field to user')
    } else {
      res.send({ success: true })
    }
  })
}

// can only create a house
router.post('/create', async (req, res) => {
  const { address, password } = req.body
  const creator = req.session.username
  const members = [creator]
  try {
    const newHouse = await House.create({
      address, members, creator, password,
    })
    addHouseToUser(req, res, creator, newHouse._id)
  } catch (err) {
    console.log(err)
    res.send('error of some sorts')
  }
})

router.get('/joinoptions', async (req, res) => {
  try {
    const options = await House.find()
    res.send(options)
  } catch (err) {
    console.log(err)
    res.send('error of some sorts')
  }
})

router.post('/join', async (req, res) => {
  const { _id, password } = req.body
  const newMember = req.session.username
  try {
    const house = await House.findById({ _id })
    if (!house) {
      res.send("house doesn't exist")
    }
    if (house.password === password) {
      house.members.push(newMember)
      house.save(err => {
        if (err) {
          res.send('issue with joining house')
        } else {
          req.session.house = house._id
          addHouseToUser(req, res, newMember, _id)
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
