const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')

// routers
const accountRouter = require('./routes/account')
const choreRouter = require('./routes/chore')
const myhouseRouter = require('./routes/myhouse')
const registerHouseRouter = require('./routes/registerHouse')
const laundryRouter = require('./routes/laundry')

// define app
const app = express()

// connect to mongo db
const my_url = 'mongodb+srv://dbuser:dbpassword@cluster0.pm7lg.mongodb.net/197project?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGODB_URI || my_url

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

// use json parser
app.use(express.json())

// set up cookie session
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
}))

// use routers
app.use('/account', accountRouter)
app.use('/chores', choreRouter)
app.use('/myhouse', myhouseRouter)
app.use('/registerhouse', registerHouseRouter)
app.use('/laundry', laundryRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000')
})
