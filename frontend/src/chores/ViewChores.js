// package imports
import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'

import Chore from './Chore'
import { getChores } from '../routecalls/routecalls'

const ViewChores = ({ loggedin }) => {
  const [chores, setChores] = useState([])

  const mapChores = filtered => (
    <Table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Completed?</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(c => <Chore chore={c} key={c._id} />)}
      </tbody>
    </Table>
  )

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
