// package imports
import React from 'react'

// local imports
import { FullPage } from '../GlobalStyles'
import ViewChores from './chores/ViewChores'
import ChoreForm from './chores/ChoreForm'

const Home = ({ loggedin }) => (
  <FullPage>
    <ViewChores loggedin={loggedin} />
    <ChoreForm />
  </FullPage>
)

export default Home
