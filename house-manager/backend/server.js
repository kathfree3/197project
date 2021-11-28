// package imports
const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const next = require('next')

// routers
const accountRouter = require('./routes/account')
const choreRouter = require('./routes/chore')
const myhouseRouter = require('./routes/myhouse')
const registerHouseRouter = require('./routes/registerHouse')
const laundryRouter = require('./routes/laundry')

// define nextjs app
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// connect to mongo db
const my_url = 'mongodb+srv://dbuser:dbpassword@cluster0.pm7lg.mongodb.net/197project?retryWrites=true&w=majority'
const MONGO_URI = process.env.MONGODB_URI || my_url

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

nextApp.prepare().then(() => {
  const app = express()
  app.use(express.json()) // use json parser

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

  app.use((err, req, res, nextCall) => {
    if (err) {
      if (err.status !== 200) {
        res.status(500).send(err.message)
      } else {
        res.status(200).send({ msg: err.message })
      }
    } else {
      nextCall()
    }
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`)
  })
})
