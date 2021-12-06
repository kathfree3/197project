/** ******************************************
 * Routes under the /account prefix
 * Used to handle the log in/ sign up system
 * ****************************************** */

// package imports
const express = require('express')

// local imports
const Roommate = require('../models/roommate')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isNotLoggedIn = require('../middlewares/isNotLoggedIn')

const router = express.Router()

// user logs in
router.post('/login', isNotLoggedIn, async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Roommate.findOne({ username })
    if (!user) {
      res.send("This username doesn't exist")
    } else {
      const { password: passDB, name, houseID } = user
      if (password === passDB) { // valid password
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
router.post('/signup', isNotLoggedIn, async (req, res) => {
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

// user logsout
router.post('/logout', isAuthenticated, async (req, res) => {
  req.session.name = null
  req.session.username = null
  req.session.house = null
  res.send('logged out')
})

// method for getting username and name of who is logged in
router.get('/loggedin', async (req, res) => {
  const { username, name } = req.session
  if (username) {
    res.send({ username, name })
  } else {
    res.send({ loggedin: false })
  }
})

module.exports = router
