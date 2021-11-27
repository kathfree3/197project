const isAuthenticated = (req, res, next) => {
  // get username from session
  const { username } = req.session || 0
  if (username && username !== '') { // allow request to continue
    next()
  } else { // throw error
    const err = new Error('Cannot access because not logged in!')
    err.status = 200
    next(err)
  }
}

module.exports = isAuthenticated
