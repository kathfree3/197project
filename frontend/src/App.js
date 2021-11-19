// package imports
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// local imports
import Home from './Home'
import Login from './logincreate/Login'
import Signup from './logincreate/Signup'
import PickHouse from './logincreate/PickHouse'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pickhouse" element={<PickHouse />} />
    </Routes>
  </Router>
)

export default App
