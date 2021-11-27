// package imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// local imports
import { logout, getUserLoggedin } from './routecalls'
import { logoutButton } from '../styles/utils.module.css'

const NavBar = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const setup = async () => setUser(await getUserLoggedin())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const { name, loggedin } = user

  const router = useRouter()

  return (
    <Navbar bg="dark" variant="dark" style={{ padding: '1rem' }}>
      <Navbar.Brand>House Manager</Navbar.Brand>
      {loggedin && (
      <Nav className="me-auto">
        <Nav.Link href="/home">Chores</Nav.Link>
        <Nav.Link href="/laundry">Laundry</Nav.Link>
      </Nav>
      )}
      {loggedin && (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{`Signed in as: ${name} `}</Navbar.Text>
        <Navbar.Text>
          <button type="button" className={logoutButton} onClick={() => logout(router)}>
            Logout
          </button>
        </Navbar.Text>
      </Navbar.Collapse>
      )}
    </Navbar>
  )
}

export default NavBar
