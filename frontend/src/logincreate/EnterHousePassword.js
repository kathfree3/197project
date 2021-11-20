// package imports
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

// local imports
import { Button } from '../../GlobalStyles'
import { joinHouse } from '../routecalls/routecalls'

const EnterPassword = ({ house }) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const { _id } = house

  const navigate = useNavigate()

  // reset if you close it
  const close = () => {
    setShow(false)
    setPassword('')
  }

  return (
    <>
      <Button type="button" onClick={() => setShow(true)}> Join </Button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Enter Password to join house
            {': '}
            {house.address}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" style={{ minWidth: '100%' }} value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="button" onClick={() => joinHouse(navigate, _id, password)}> Join </Button>
          <Button type="button" onClick={() => close()}> Close </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EnterPassword
