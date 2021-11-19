// package imports
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// local imports
import Login from './Login'
import Home from './Home'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<div> hi </div>} />
    </Routes>
  </Router>
)

export default App
