// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

// local imports
import AssignOptions from './AssignOptions'
import { newChore } from './routecalls'

// style
import { createbutton, full } from '../styles/utils.module.css'

const NewChore = ({ roommates }) => {
  const [show, setShow] = useState(false)
  const [assignedUser, setAssignedUser] = useState('None')
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  const close = () => {
    setShow(false)
    setTask('')
    setDescription('')
    setAssignedUser('None')
  }

  const create = () => {
    newChore(assignedUser, task, description)
    close()
  }

  return (
    <>
      <button type="button" className={createbutton} onClick={() => setShow(true)}> New Chore </button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> New Chore </Modal.Title>
        </Modal.Header>
        <Modal.Body className={full}>
          <label> Task: </label>
          <input value={task} type="text" onChange={e => setTask(e.target.value)} />
          <label> Short description: </label>
          <input value={description} type="text" onChange={e => setDescription(e.target.value)} />
          <label> Assign to: </label>
          <AssignOptions roommates={roommates} assignedTo={assignedUser} setAssignedUser={setAssignedUser} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => create()}> Create </button>
          <button type="button" onClick={() => close()}> Close </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewChore
