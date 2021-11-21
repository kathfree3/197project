const express = require('express')
const Chore = require('../models/chore')

const router = express.Router()

// helper function for saving a chore once it has been modified
const saveChore = (res, chore) => {
  chore.save(e => {
    if (e) {
      res.send('issue saving chore')
    } else {
      res.send({ success: true })
    }
  })
}

// get all the chores for your house
router.get('/', async (req, res) => {
  const { house } = req.session
  try {
    const chores = await Chore.find({ houseID: house })
    res.send(chores)
  } catch (err) {
    res.send('error getting chores')
  }
})

// get chores by completed
router.get('/completed', async (req, res) => {
  const { house } = req.session
  try {
    const chores = await Chore.find({ houseID: house, completed: true })
    res.send(chores)
  } catch (err) {
    res.send('error getting chores')
  }
})

// get chores by not completed
router.get('/notcompleted', async (req, res) => {
  const { house } = req.session
  try {
    const chores = await Chore.find({ houseID: house, completed: false })
    res.send(chores)
  } catch (err) {
    res.send('error getting chores')
  }
})

// get a persons chores
router.get('/:userid', async (req, res) => {
  const { house } = req.session
  const { userID } = req.params.userid
  try {
    const chores = await Chore.find({ houseID: house, assignedTo: userID })
    res.send(chores)
  } catch (err) {
    res.send('error getting users chores')
  }
})

// get unassigned chores
router.get('/unassigned', async (req, res) => {
  const { house } = req.session
  try {
    const chores = await Chore.find({ houseID: house, assignedTo: 'None' })
    res.send(chores)
  } catch (err) {
    res.send('error getting unassigned chores')
  }
})

// create a chore
router.post('/create', async (req, res) => {
  const { assignedTo, task, description } = req.body
  const houseID = req.session.house
  const completed = false
  try {
    await Chore.create({
      houseID, assignedTo, completed, task, description,
    })
    res.send({ succes: true })
  } catch (err) {
    res.send('chore has creation problems')
  }
})

router.post('/:id/modify', async (req, res) => {
  const { description } = req.body
  const { id } = req.params
  try {
    const chore = await Chore.findById(id)
    chore.description = description
    saveChore(chore)
  } catch (err) {
    console.log(err)
    res.send({ success: false })
  }
})

router.post('/:id/assign', async (req, res) => {
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

// route for toggling a chore completed or not
router.post('/:id/togglecomplete', async (req, res) => {
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
