// routes to handle the log in/ sign up system

const express = require('express')
const Roommate = require('../models/roommate')

const router = express.Router()

// user logs in
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Roommate.findOne({ username })
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
        res.send('Incorrect password')
      }
    }
  } catch (err) {
    res.send('Log in has problems')
  }
})

// user signs up
router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body
  const houseID = ''
  try {
    await Roommate.create({
      name, username, houseID, password,
    })
    req.session.username = username
    req.session.name = name
    res.send({ success: true })
  } catch (err) {
    res.send('Username is already taken')
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
  const { username, name } = req.session
  if (username !== null && username !== '') {
    res.send({ username, name })
  } else {
    res.send('no one is logged in')
  }
})

module.exports = router
