// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useRouter } from 'next/router'

// local imports
import { joinHouse } from './routecalls'
import { full } from '../styles/utils.module.css'

const EnterPassword = ({ house }) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const { _id } = house

  const router = useRouter()

  // reset if you close it
  const close = () => {
    setShow(false)
    setPassword('')
  }

  return (
    <>
      <button onClick={() => setShow(true)}> Join </button>
      <Modal centered show={show} onHide={() => close()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{`Enter Password to join: ${house.address}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={full}>
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => joinHouse(router, _id, password)}> Join </button>
          <button onClick={() => close()}> Close </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EnterPassword
