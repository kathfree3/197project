// package imports
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useRouter } from 'next/router'

// local imports
import { joinHouse } from './routecalls'

// style
import { full } from '../styles/utils.module.css'

const EnterPassword = ({ house }) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const { _id, address } = house

  const router = useRouter()

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
          <Modal.Title>{`Enter Password to join: ${address}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={full}>
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => joinHouse(router, _id, password)}> Join </button>
          <button type="button" onClick={() => close()}> Close </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EnterPassword
