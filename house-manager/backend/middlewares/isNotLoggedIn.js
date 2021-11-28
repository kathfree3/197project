// Middleware to be used when you cannot be logged in to access

const isNotLoggedIn = (req, res, next) => {
  // get username from session
  const { username } = req.session
  if (username && username !== '') { // allow request to continue
    const err = new Error('Need to be logged out to view')
    err.status = 200
    next(err)
  } else { // throw error
    next()
  }
}

module.exports = isNotLoggedIn
