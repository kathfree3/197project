// package imports
import React, { useState, useEffect } from 'react'

// local imports
import LaundryMachine from '../components/LaundryMachine'
import NewMachine from '../components/NewMachine'
import { getMachines, needToBeLoggedIn } from '../components/routecalls'

// style
import { page, flexwrapper, expand } from '../styles/utils.module.css'

const LaundryPage = () => {
  const [machines, setMachines] = useState([])

  // update periodically
  useEffect(() => {
    const setup = async () => setMachines(await getMachines())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // filter method: separate laundry and dryers
  const check = (machine, wantedType) => {
    const { type } = machine
    return wantedType === type
  }

  // map method: take in machine object and display machine component
  const display = machine => {
    const { _id } = machine
    return <LaundryMachine key={_id} machine={machine} />
  }

  // display
  return (
    <div className={page}>
      {machines && (
      <div className={flexwrapper}>
        <div className={expand}>{machines.filter(m => check(m, 'Washer')).map(m => display(m))}</div>
        <div className={expand}>{machines.filter(m => check(m, 'Dryer')).map(m => display(m))}</div>
      </div>
      )}
      <NewMachine />
    </div>
  )
}

export default LaundryPage

// nextJS --> authenticate route
export async function getServerSideProps(context) {
  return needToBeLoggedIn(context)
}
