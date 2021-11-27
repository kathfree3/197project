// Router for the laundry
const express = require('express')
const moment = require('moment')

const Laundry = require('../models/laundry')
const House = require('../models/house')

const router = express.Router()

// helper function
const addLaundryToHouse = async (req, res, id) => {
  const { house } = req.session
  const home = await House.findById(house)
  home.laundry.push(id)
  home.save(err => {
    if (err) {
      res.send('issue with adding laundry to house')
    } else {
      res.send({ success: true })
    }
  })
}

// create a laundry object & add it to houes
router.post('/create', async (req, res) => {
  const { type, duration } = req.body
  const { house } = req.session
  if (type !== 'Washer' && type !== 'Dryer') {
    res.send({ success: false, msg: 'bad type' })
  }
  try {
    const newLaundry = await Laundry.create({ type, duration, houseID: house })
    addLaundryToHouse(req, res, newLaundry._id)
  } catch (err) {
    res.send(err)
  }
})

// get laundry machines for a given house
router.get('/viewall', async (req, res) => {
  const { house } = req.session
  try {
    const machines = await Laundry.find({ houseID: house })
    res.send(machines)
  } catch (err) {
    res.send(err)
  }
})

// start a load
router.post('/startload/:id', async (req, res) => {
  const { id } = req.params
  try {
    const laundry = await Laundry.findById(id)
    const { duration, inUse } = laundry
    if (inUse) {
      res.send({ err: 'Currently in use' })
    } else {
      const loadOverAt = moment()
      loadOverAt.add(duration, 'minutes')
      laundry.timeCompleted = loadOverAt.valueOf()
      laundry.inUse = true
      laundry.save()
      res.send({ succes: true })
    }
  } catch (err) {
    res.send(err)
  }
})

// finish a load
router.post('/finishload/:id', async (req, res) => {
  const { id } = req.params
  try {
    const laundry = await Laundry.findById(id)
    const { timeCompleted } = laundry
    const now = moment()
    const over = moment(timeCompleted)
    if (now >= over) {
      laundry.inUse = false
      laundry.save()
      res.send({ succes: true })
    } else {
      res.send({ succes: false, msg: 'not done yet' })
    }
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
