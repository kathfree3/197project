// package imports
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import { newChore, getRoomates } from './routecalls'
import { createbutton } from '../styles/utils.module.css'

const NewChore = () => {
  const [show, setShow] = useState(false)
  const [assignedTo, setAssignedTo] = useState('None')
  const [assignOptions, setAssignOptions] = useState([])
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  const close = () => {
    setShow(false)
    setTask('')
    setDescription('')
    setAssignedTo('None')
  }

  useEffect(() => {
    const setup = async () => setAssignOptions([...await getRoomates(), 'None'])
    setup()
  }, [])

  return (
    <>
      <button className={createbutton} type="button" onClick={() => setShow(true)}> New Chore </button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> New Chore </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label> Task: </label>
          <input value={task} type="text" onChange={e => setTask(e.target.value)} />
          <label> Short description: </label>
          <input value={description} type="text" onChange={e => setDescription(e.target.value)} />
          <label> Assign to: </label>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              {assignedTo}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {assignOptions.map(a => (
                <Dropdown.Item key={a} onClick={() => setAssignedTo(a)}>{a}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <button type="button" onClick={() => newChore(assignedTo, task, description)}> Create </button>
          <button type="button" onClick={() => close()}> Close </button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewChore
