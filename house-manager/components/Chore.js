// package imports
import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import { toggle, getRoomates, assignChore } from './routecalls'
import { editbutton } from '../styles/utils.module.css'

const Chore = ({ chore }) => {
  const {
    _id, task, description, assignedTo, completed,
  } = chore

  const [editMode, setEditMode] = useState(false)

  const [reassign, setReassign] = useState(assignedTo)
  const [assignOptions, setAssignOptions] = useState([])

  useEffect(() => {
    const setup = async () => setAssignOptions([...await getRoomates(), 'None'])
    setup()
  }, [])

  const click = () => {
    editMode && assignChore(_id, reassign)
    setEditMode(!editMode)
  }

  const displayAssigned = () => {
    if (!editMode) {
      return assignedTo
    } else {
      return (
      <Dropdown>
        <Dropdown.Toggle>
          {reassign}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {assignOptions.map(a => (
            <Dropdown.Item key={a} onClick={() => setReassign(a)}>{a}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      )
    }
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
        <button className={editbutton} onClick={() => click()}>
          {editMode ? 'Save' : 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>}
        </button>
      </td>
    </tr>
  )
}

export default Chore
