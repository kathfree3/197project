// package imports
import React from 'react'
import moment from 'moment'

// local imports
import { stopLoad, startLoad } from './routecalls'
import {
  machinewrapper, start, takeout, running,
} from '../styles/utils.module.css'

import { Eject, Timer, PlayButton } from '../public/icons'

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
            <p><span>Load is over!</span></p>
            <button className={takeout} type="button" onClick={() => stopLoad(_id)}>
              {'Take out '}
              <Eject />
            </button>
          </>
        )
      }
      return (
        <div className={running}>
          <Timer />
          {` ${timeLeft} minutes left`}
        </div>
      )
    }
    return (
      <>
        <p><span>{`Takes: ${duration} minutes`}</span></p>
        <button className={start} type="button" onClick={() => startLoad(_id)}>
          {'Start Load '}
          <PlayButton />
        </button>
      </>
    )
  }

  return (
    <div className={machinewrapper}>
      <h2>{`${type}`}</h2>
      <p>
        {`Status: `}
        <span>{inUse ? 'In Use' : 'Empty'}</span>
      </p>
      {show()}
    </div>
  )
}

export default LaundryMachine
