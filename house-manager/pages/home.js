// package imports
import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import { useRouter } from 'next/router'

// local imports
import { page } from '../styles/utils.module.css'
import Chore from '../components/Chore'
import NewChore from '../components/NewChore'
import { getChores, getUserLoggedin } from '../components/routecalls'

const Home = () => {
  const [chores, setChores] = useState([])
  const [loggedin, setLoggedin] = useState({})
  const router = useRouter()
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
    const setup = async () => {
      setChores(await getChores())
      setLoggedin(await getUserLoggedin())
    }
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className={page}>
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
      <ChoreForm />
    </div>
  )
}

export default Home
