// package imports
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// local imports
import { getUserLoggedin, getChores } from './routecalls/routecalls'
import Home from './Home'
import Login from './logincreate/Login'
import Signup from './logincreate/Signup'
import PickHouse from './logincreate/PickHouse'
import LaundryPage from './laundry/LaundryPage'
import NavBar from './NavBar'

const App = () => {
  const [loggedin, setLoggedin] = useState({})

  useEffect(() => {
    const setup = async () => setLoggedin(await getUserLoggedin())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <Router>
      <NavBar loggedin={loggedin} />
      <Routes>
        <Route path="/home" element={<Home loggedin={loggedin} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pickhouse" element={<PickHouse />} />
        <Route path="/laundry" element={<LaundryPage />} />
      </Routes>
    </Router>
  )
}

export default App
