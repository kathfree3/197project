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
  const [chores, setChores] = useState([])

  const navigate = useNavigate()

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  useEffect(() => {
    const setup = async () => {
      const { data } = await axios.get('/account/isloggedin')
      setTest(data)
      const { data: cs } = await axios.get('/chores/notcompleted')
      setChores(cs)
    }
    setup()
  }, [])

  return (
    <div>
      home page
      <button type="button" onClick={() => logout()}> Log out </button>
      {test.username}
      {test.name}
      {chores && chores.map(c => (
        <div>
          <p>
            {c.task}
          </p>
          <p>
            {c.description}
          </p>
          <p>
            {c.assignedTo}
          </p>
          <p>
            {c.completed ? 'completed' : 'not completed'}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Home
