// package imports
import React from 'react'
import moment from 'moment'

// local imports
import { stopLoad, startLoad } from './routecalls'
import { machinewrapper } from '../styles/utils.module.css'

const LaundryMachine = ({ machine }) => {
  const {
    type, inUse, duration, timeCompleted, _id,
  } = machine

  const overIn = () => {
    const seconds = moment(timeCompleted).diff(moment(), 'seconds')
    return Math.ceil(seconds / 60)
  }

  const timeLeft = Math.max(0, overIn())

  const show = () => {
    if (inUse) {
      if (timeLeft === 0) {
        return (
          <>
            <span> Load is over!</span>
            <button onClick={() => stopLoad(_id)}> Take out </button>
          </>
        )
      }
      return `Over in ${timeLeft} minutes`
    }
    return <button onClick={() => startLoad(_id)}> Start Load </button>
  }

  return (
    <div id={_id} className={machinewrapper}>
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
