// package imports
import React, { useState, useEffect } from 'react'

// local imports
import { page, flexwrapper, expand } from '../styles/utils.module.css'
import LaundryMachine from '../components/LaundryMachine'
import NewMachine from '../components/NewMachine'
import { getMachines, needToBeLoggedIn } from '../components/routecalls'

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

  const check = (m, t) => {
    const { type } = m
    return t === type
  }

  const mapM = m => {
    const { _id } = m
    return <LaundryMachine key={_id} machine={m} />
  }

  return (
    <div className={page}>
      {machines && (
      <div className={flexwrapper}>
        <div className={expand}>{machines.filter(m => check(m, 'Washer')).map(m => mapM(m))}</div>
        <div className={expand}>{machines.filter(m => check(m, 'Dryer')).map(m => mapM(m))}</div>
      </div>
      )}
      <NewMachine />
    </div>
  )
}

export default LaundryPage

export async function getServerSideProps(context) {
  return needToBeLoggedIn(context)
}
