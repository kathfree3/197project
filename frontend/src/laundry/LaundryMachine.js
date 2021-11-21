// package imports
import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { stopLoad } from '../routecalls/routecalls'

const LaundryMachine = ({ machine }) => {
  const [timeLeft, setTimeLeft] = useState('')

  const {
    type, inUse, timeCompleted, _id,
  } = machine

  const overIn = () => {
    const diffInMinutes = moment(timeCompleted).diff(moment(), 'minutes')
    return diffInMinutes
  }

  useEffect(() => {
    const setup = () => setTimeLeft(Math.max(0, overIn()))
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 60000)
    return () => clearInterval(intervalID)
  }, [])

  const show = () => {
    if (inUse) {
      if (timeLeft === 0) {
        return <button type="button" onClick={() => stopLoad(_id)}> Take load out </button>
      }
      return `Over in ${timeLeft} minutes`
    }
    return <button type="button"> Start Load </button>
  }

  return (
    <div>
      <p>{type}</p>
      {show()}
    </div>
  )
}

export default LaundryMachine
