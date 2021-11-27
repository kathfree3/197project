// package imports
import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import { toggle, getRoomates, assignChore } from './routecalls'
import { editbutton } from '../styles/utils.module.css'
import { EditIcon } from '../public/icons'

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
    if (editMode) {
      assignChore(_id, reassign)
    }
    setEditMode(!editMode)
  }

  const displayAssigned = () => {
    if (!editMode) {
      return assignedTo
    }
    return (
      <Dropdown>
        <Dropdown.Toggle>{reassign}</Dropdown.Toggle>
        <Dropdown.Menu>
          {assignOptions.map(a => (
            <Dropdown.Item key={a} onClick={() => setReassign(a)}>{a}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
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
