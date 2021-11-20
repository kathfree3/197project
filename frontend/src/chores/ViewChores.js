// package imports
import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'

import Chore from './Chore'
import { getChores } from '../routecalls/routecalls'

const ViewChores = ({ loggedin }) => {
  const [chores, setChores] = useState([])

  const mapChores = filtered => filtered.map(c => <Chore chore={c} />)

  useEffect(() => {
    const setup = async () => setChores(await getChores())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div>
      <Tabs defaultActiveKey="current" className="mb-3">
        <Tab eventKey="current" title="Current Chores">
          {mapChores(chores.filter(c => !c.completed))}
        </Tab>
        <Tab eventKey="mine" title="My Chores">
          {mapChores(chores.filter(c => !c.completed && c.assignedTo === loggedin.username))}
        </Tab>
        <Tab eventKey="completed" title="All Completed Chores">
          {mapChores(chores.filter(c => c.completed))}
        </Tab>
      </Tabs>
    </div>
  )
}

export default ViewChores