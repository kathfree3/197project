// package imports
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../GlobalStyles'

import {
  toggle, getChores, getUserLoggedin,
} from './routecalls/routecalls'

import CreateChore from './chores/CreateChore'
import ViewChores from './chores/ViewChores'

const Home = ({ loggedin }) => {
  const [chores, setChores] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const setup = async () => {
      setChores(await getChores())
    }
    setup()
  }, [])

  return (
    <FullPage>
      home page
      <ViewChores loggedin={loggedin} />
      <CreateChore />
    </FullPage>
  )
}

export default Home
