// package imports
import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

// local imports
import { page } from '../styles/utils.module.css'
import Chore from '../components/Chore'
import NewChore from '../components/NewChore'
import { getChores, needToBeLoggedIn } from '../components/routecalls'

const Home = ({ username }) => {
  const [chores, setChores] = useState([])

  const mapChores = filtered => (
    <Table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Completed?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(c => { 
          const { _id } = c
          return <Chore chore={c} key={_id} />
        })}
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

  
  
  const done = (c, wanted) => {
    const { completed } = c
    return completed === wanted
  }

  const myChores = c => {
    const { assignedTo } = c
    return assignedTo === username
  }

  return (
    <div className={page}>
      <Tabs id='all' defaultActiveKey="current" className="mb-3">
        <Tab eventKey="current" title="Current Chores">
          {mapChores(chores.filter(c => done(c, false)))}
        </Tab>
        <Tab id='justmine' eventKey="mine" title="My Chores">
          {mapChores(chores.filter(c => done(c, false) && myChores(c)))}
        </Tab>
        <Tab id='allcompleted' eventKey="completed" title="All Completed Chores">
          {mapChores(chores.filter(c => done(c, true)))}
        </Tab>
      </Tabs>
      <NewChore />
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  return needToBeLoggedIn(context)
}