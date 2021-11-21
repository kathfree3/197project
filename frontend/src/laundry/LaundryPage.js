// package imports
import React, { useState, useEffect } from 'react'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'

import LaundryMachine from './LaundryMachine'
import NewMachine from './NewMachine'
import { getMachines } from '../routecalls/routecalls'

const LaundryPage = ({ loggedin }) => {
  const [machines, setMachines] = useState([])

  useEffect(() => {
    const setup = async () => setMachines(await getMachines())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 10000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div>
      {machines.map(m => <LaundryMachine key={m._id} machine={m} />)}
      <NewMachine />
    </div>
  )
}

export default LaundryPage
