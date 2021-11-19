// package imports
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../GlobalStyles'

const Home = () => {
  const [test, setTest] = useState({})

  const navigate = useNavigate()

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  useEffect(() => {
    const setup = async () => {
      const { data } = await axios.get('/account/isloggedin')
      setTest(data)
    }
    setup()
  }, [])

  return (
    <div>
      home page
      <button type="button" onClick={() => logout()}> Log out </button>
      {test.username}
      {test.name}
    </div>
  )
}

export default Home
