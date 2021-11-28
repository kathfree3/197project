// package imports
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { toggleDropDown } from '../styles/utils.module.css'

const AssignOptions = ({ roommates, assignedTo, setAssignedUser }) => {
  const [reassignName, setReassignName] = useState(assignedTo || 'None')

  const clickDrop = (u, n) => {
    setReassignName(n)
    setAssignedUser(u)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className={toggleDropDown}>{reassignName}</Dropdown.Toggle>
      <Dropdown.Menu>
        {roommates.map(({ username, name }) => (
          <Dropdown.Item key={username} onClick={() => clickDrop(username, name)}>
            {`${name} (${username})`}
          </Dropdown.Item>
        ))}
        <Dropdown.Item key="None" onClick={() => clickDrop('None', 'None')}>
          None
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AssignOptions
