// package imports
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import s from 'styled-components'

// local imports
import { Button } from '../../GlobalStyles'
import { stopLoad, startLoad } from '../routecalls/routecalls'

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
            <Button type="button" onClick={() => stopLoad(_id)}> Take out </Button>
          </>
        )
      }
      return `Over in ${timeLeft} minutes`
    }
    return <Button type="button" onClick={() => startLoad(_id)}> Start Load </Button>
  }

  return (
    <MachineWrapper>
      <p>
        {`${type}: `}
        <span>{`Takes: ${duration} minutes`}</span>
      </p>
      <p>{`Status: ${inUse ? 'In Use' : 'Empty'} `}</p>
      {show()}
    </MachineWrapper>
  )
}

export default LaundryMachine

const MachineWrapper = s.div`
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  p {
    font-weight: bold;
  }
  span {
    font-weight: normal;
  }
  margin: 1rem;
  padding: 1rem;
`
