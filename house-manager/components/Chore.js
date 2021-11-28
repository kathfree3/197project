// package imports
import React, { useState } from 'react'

// local imports
import AssignOptions from './AssignOptions'
import { toggle, assignChore } from './routecalls'

// style
import { editbutton } from '../styles/utils.module.css'
import { EditIcon } from '../public/icons'

const Chore = ({ chore, roommates }) => {
  const {
    _id, task, description, assignedTo, completed,
  } = chore

  const [editMode, setEditMode] = useState(false)
  const [reassignUser, setReassignUser] = useState(assignedTo)

  const click = () => {
    if (editMode) {
      assignChore(_id, reassignUser)
    }
    setEditMode(!editMode)
  }

  const displayAssigned = () => {
    if (!editMode) {
      return assignedTo
    }
    return <AssignOptions roommates={roommates} assignedTo={reassignUser} setAssignedUser={setReassignUser} />
  }

  return (
    <tr>
      <td>{task}</td>
      <td>{description}</td>
      <td>{displayAssigned()}</td>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          checked={completed}
          onChange={() => toggle(_id)}
        />
      </td>
      <td>
        <button type="button" className={editbutton} onClick={() => click()}>
          {editMode ? 'Save' : <EditIcon />}
        </button>
      </td>
    </tr>
  )
}

export default Chore
