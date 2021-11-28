const express = require('express')

// local
const House = require('../models/house')
const Roommate = require('../models/roommate')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

// get all info about a hoes
router.get('/', isAuthenticated, async (req, res) => {
  const { house } = req.session
  try {
    const home = await House.findById({ _id: house })
    res.send(home)
  } catch (err) {
    res.send('error getting all home details')
  }
})

// get all members in a house
router.get('/members', isAuthenticated, async (req, res) => {
  const { house } = req.session
  try {
    const { members } = await House.findById({ _id: house }, 'members')
    const arr = []
    members.forEach(m => {
      const p = Roommate.findOne({ username: m }, { username: 1, name: 1, _id: 0 })
      arr.push(p)
    })
    Promise.all(arr)
      .then(x => {
        res.send(x)
      })
      .catch(err => {
        res.send('eee')
      })
  } catch (err) {
    res.send('error getting members')
  }
})

module.exports = router
