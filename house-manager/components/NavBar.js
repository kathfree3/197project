// package imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// local imports
import { logout, getName } from './routecalls'
import { logoutLink } from '../styles/utils.module.css'

const NavBar = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const setup = async () => setUser(await getName())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const { name } = user

  const router = useRouter()

  return (
    <Navbar bg="dark" variant="dark" style={{ padding: '1rem' }}>
      <Navbar.Brand>House Manager</Navbar.Brand>
      {name && (
      <Nav className="me-auto">
        <Nav.Link href="/home">Chores</Nav.Link>
        <Nav.Link href="/laundry">Laundry</Nav.Link>
      </Nav>
      )}
      {name && (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{`Signed in as: ${name} `}</Navbar.Text>
        <Navbar.Text>
          <button type="button" className={logoutLink} onClick={() => logout(router)}>Logout</button>
        </Navbar.Text>
      </Navbar.Collapse>
      )}
    </Navbar>
  )
}

export default NavBar
