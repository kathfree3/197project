// package imports
import React from 'react'
import s from 'styled-components'

import { toggle } from '../routecalls/routecalls'
import ChoreForm from './ChoreForm'

const Chore = ({ chore }) => {
  const {
    _id, task, description, assignedTo, completed,
  } = chore

  return (
    <tr>
      <td>{task}</td>
      <td>{description}</td>
      <td>{assignedTo}</td>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          checked={completed}
          onChange={() => toggle(_id)}
        />
      </td>
    </tr>
  )
}

export default Chore
