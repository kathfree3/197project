/** ******************************************
 * Routes under the /chores prefix
 * Used to handle chores methods
 * ****************************************** */

// package imports
const express = require('express')

// local imports
const Chore = require('../models/chore')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

// helper function for saving a chore once it has been modified
const saveChore = (res, chore) => {
  chore.save(e => (e ? res.send('issue saving chore') : res.send({ success: true })))
}

// get all the chores for a house
router.get('/', isAuthenticated, async (req, res) => {
  const { house } = req.session
  try {
    const chores = await Chore.find({ houseID: house })
    res.send(chores)
  } catch (err) {
    res.send('error getting chores')
  }
})

// create a chore
router.post('/create', isAuthenticated, async (req, res) => {
  const { assignedTo, task, description } = req.body
  const { house: houseID } = req.session

  try {
    await Chore.create({
      houseID, assignedTo, completed: false, task, description,
    })
    res.send({ success: true })
  } catch (err) {
    res.send('chore has creation problems')
  }
})

// assign a chore to a roommate of the house
router.post('/:id/assign', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const { assignTo } = req.body
  try {
    const chore = await Chore.findById(id)
    chore.assignedTo = assignTo
    saveChore(res, chore)
  } catch (err) {
    res.send('error w toggling chore')
  }
})

// toggling a chores completed field
router.post('/:id/togglecomplete', isAuthenticated, async (req, res) => {
  const { id } = req.params
  try {
    const chore = await Chore.findById(id)
    chore.completed = !chore.completed
    saveChore(res, chore)
  } catch (err) {
    res.send('error w toggling chore')
  }
})

module.exports = router
