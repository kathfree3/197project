// package imports
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

// local imports
import {
  Button, Label, Input, Create,
} from '../../GlobalStyles'
import { newChore, getRoomates } from '../routecalls/routecalls'

const ChoreForm = () => {
  const [show, setShow] = useState(false)
  const [assignedTo, setAssignedTo] = useState('None')
  const [assignOptions, setAssignOptions] = useState([])
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

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
      <Create type="button" onClick={() => setShow(true)}> New Chore </Create>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> New Chore </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Label> Task: </Label>
          <Input value={task} type="text" onChange={e => setTask(e.target.value)} />
          <Label> Short description: </Label>
          <Input value={description} type="text" onChange={e => setDescription(e.target.value)} />
          <Label> Assign to: </Label>
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
          <Button type="button" onClick={() => newChore(navigate, assignedTo, task, description)}> Create </Button>
          <Button type="button" onClick={() => close()}> Close </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ChoreForm
