// routes to handle the log in system
const express = require('express')

const router = express.Router()

const House = require('../models/house')
const Roomate = require('../models/roomate')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Roomate.findOne({ username })
    if (!user) {
      res.send("This username doesn't exist")
    } else {
      const { password: passDB, name, houseID } = user
      if (password === passDB) {
        req.session.username = username
        req.session.house = houseID
        req.session.name = name
        res.send({ success: true })
      } else {
        res.send('wrong password')
      }
    }
  } catch (err) {
    res.send('log in has problems')
  }
})

router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body
  const houseID = ''
  try {
    await Roomate.create({
      name, username, houseID, password,
    })
    req.session.username = username
    req.session.name = name
    res.send({ success: true })
  } catch (err) {
    console.log(err)
    res.send({ success: false })
  }
})

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
router.post('/createhouse', async (req, res) => {
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

router.get('/gethouses', async (req, res) => {
  try {
    const questions = await House.find()
    res.send(questions)
  } catch (err) {
    console.log(err)
    res.send('error of some sorts')
  }
})

router.post('/joinhouse', async (req, res) => {
  // 6196a6a836882b07990c7e41
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

router.post('/logout', async (req, res) => {
  req.session.name = null
  req.session.username = null
  req.session.password = null
  req.session.house = null
  res.send('logged out')
})

router.get('/isloggedin', (req, res) => {
  if (req.session.username !== null && req.session.username !== '') {
    res.send({ username: req.session.username, name: req.session.name })
  } else {
    res.send('no one is logged in')
  }
})

module.exports = router
