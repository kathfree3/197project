// package imports
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import { newChore, getRoomates } from './routecalls'
import { createbutton, full } from '../styles/utils.module.css'

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

  const create = () => {
    newChore(assignedTo, task, description)
    close()
  }

  useEffect(() => {
    const setup = async () => setAssignOptions([...await getRoomates(), 'None'])
    setup()
  }, [])

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
