// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../GlobalStyles'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    // eslint-disable-next-line no-alert
    return data.success ? navigate('/') : alert(data.msg)
  }

  const logout = async () => {
    await axios.post('/account/logout')
    navigate('/login')
  }

  return (
    <div>
      home page
      <button type="button" onClick={() => logout()}> Log out </button>
    </div>
  )
}

export default Home
