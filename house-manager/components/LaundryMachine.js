// package imports
import React, { useState, useEffect } from 'react'
import moment from 'moment'

// local imports
import { stopLoad, startLoad } from './routecalls'
import { machinewrapper } from '../styles/utils.module.css'

const LaundryMachine = ({ machine }) => {
  const [timeLeft, setTimeLeft] = useState('')

  const {
    type, inUse, duration, timeCompleted, _id,
  } = machine

  const overIn = () => {
    const diffInMinutes = moment(timeCompleted).diff(moment(), 'seconds')
    return Math.ceil(diffInMinutes / 60)
  }

  useEffect(() => {
    const setup = () => setTimeLeft(Math.max(0, overIn()))
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const show = () => {
    if (inUse) {
      if (timeLeft === 0) {
        return (
          <>
            <span> Load is over!</span>
            <button type="button" onClick={() => stopLoad(_id)}> Take out </button>
          </>
        )
      }
      return `Over in ${timeLeft} minutes`
    }
    return <button type="button" onClick={() => startLoad(_id)}> Start Load </button>
  }

  return (
    <div className={machinewrapper}>
      <p>
        {`${type}: `}
        <span>{`Takes: ${duration} minutes`}</span>
      </p>
      <p>{`Status: ${inUse ? 'In Use' : 'Empty'} `}</p>
      {show()}
    </div>
  )
}

export default LaundryMachine
