// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

// local imports
import { joinHouse } from './routecalls'

const EnterPassword = ({ house }) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const { _id } = house

  // reset if you close it
  const close = () => {
    setShow(false)
    setPassword('')
  }

  return (
    <>
      <button type="button" onClick={() => setShow(true)}> Join </button>
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
          <button type="button" onClick={() => joinHouse(_id, password)}> Join </button>
          <button type="button" onClick={() => close()}> Close </button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EnterPassword
