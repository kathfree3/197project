// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// local imports
import { FullPage } from '../GlobalStyles'

import { getChores } from './routecalls/routecalls'

import ViewChores from './chores/ViewChores'
import ChoreForm from './chores/ChoreForm'

const Home = ({ loggedin }) => (
  <FullPage>
    home page
    <ViewChores loggedin={loggedin} />
    <ChoreForm />
  </FullPage>
)

export default Home
