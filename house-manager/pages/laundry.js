// package imports
import React, { useState, useEffect } from 'react'

// local imports
import { page, flexwrapper } from '../styles/utils.module.css'
import LaundryMachine from '../components/LaundryMachine'
import NewMachine from '../components/NewMachine'
import { getMachines } from '../components/routecalls'

const LaundryPage = () => {
  const [machines, setMachines] = useState([])

  useEffect(() => {
    const setup = async () => setMachines(await getMachines())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className={page}>
      <div className={flexwrapper}>
        <div>
          {machines.filter(m => m.type === 'Washer').map(m => <LaundryMachine key={m._id} machine={m} />)}
        </div>
        <div>
          {machines.filter(m => m.type === 'Dryer').map(m => <LaundryMachine key={m._id} machine={m} />)}
        </div>
      </div>
      <NewMachine />
    </div>
  )
}

export default LaundryPage
