// package imports
import React from 'react'
import s from 'styled-components'

import { toggle } from '../routecalls/routecalls'

const Chore = ({ chore }) => {
  const {
    _id, task, description, assignedTo, completed,
  } = chore

  return (
    <ChoreWrapper key={_id}>
      <p>
        {task}
      </p>
      <p>
        {description}
      </p>
      <p>
        {assignedTo}
      </p>
      <button type="button" onClick={() => toggle(_id)}>
        {completed ? 'completed' : 'not completed'}
      </button>
    </ChoreWrapper>
  )
}

export default Chore

const ChoreWrapper = s.div`
`
