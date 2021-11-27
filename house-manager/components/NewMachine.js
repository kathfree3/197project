// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import { createbutton } from '../styles/utils.module.css'
import { createMachine } from './routecalls'

const NewMachine = () => {
  const [show, setShow] = useState(false)
  const [duration, setDuration] = useState(0)
  const [type, setType] = useState('Washer')
  const typeOptions = ['Washer', 'Dryer']

  const close = () => {
    setShow(false)
    setType('Washer')
    setDuration(0)
  }

  const createClicked = () => {
    createMachine(type, duration)
    close()
  }

  return (
    <>
      <button type="button" className={createbutton} onClick={() => setShow(true)}> Register New Machine </button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> New Laundry Machine </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label> Type: </label>
          <Dropdown>
            <Dropdown.Toggle variant="success">{type}</Dropdown.Toggle>
            <Dropdown.Menu>
              {typeOptions.map(t => (
                <Dropdown.Item key={t} onClick={() => setType(t)}>{t}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <label> Duration (in minutes): </label>
          <input value={duration} type="text" onChange={e => setDuration(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => createClicked()}> Create </button>
          <button type="button" onClick={() => close()}> Close </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewMachine
