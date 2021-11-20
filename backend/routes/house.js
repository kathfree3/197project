const express = require('express')

const House = require('../models/house')

const router = express.Router()

// get all info about a hoes
router.get('/', async (req, res) => {
  const { house } = req.session
  console.log(house)
  try {
    const home = await House.findById({ _id: house })
    res.send(home)
  } catch (err) {
    res.send('error getting all home details')
  }
})

// get all members in a house
router.get('/members', async (req, res) => {
  const { house } = req.session
  try {
    const { members } = await House.findById({ _id: house }, 'members')
    res.send(members)
  } catch (err) {
    res.send('error getting members')
  }
})

module.exports = router
