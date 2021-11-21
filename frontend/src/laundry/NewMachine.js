// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import {
  Button, Label, Input,
} from '../../GlobalStyles'
import { createMachine } from '../routecalls/routecalls'

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
      <Button type="button" onClick={() => setShow(true)}> Register New Machine </Button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> New Laundry Machine </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Label> Type </Label>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              {type}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {typeOptions.map(t => (
                <Dropdown.Item key={t} onClick={() => setType(t)}>{t}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Label> Duration: </Label>
          <Input value={duration} type="text" onChange={e => setDuration(e.target.value)} />
          <Button type="button" onClick={() => createClicked()}> Create </Button>
          <Button type="button" onClick={() => close()}> Close </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewMachine
