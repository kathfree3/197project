// package imports
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { logout } from './routecalls/routecalls'

const NavBar = ({ loggedin }) => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>EEeee</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/laundry">Laundry</Nav.Link>
        <Nav.Link href="#">Idk</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:
          {' '}
          {loggedin.name}
        </Navbar.Text>
        <NavDropdown title="" id="nav-dropdown">
          <NavDropdown.Item> Account Details </NavDropdown.Item>
          <NavDropdown.Item onClick={() => logout(navigate)}> Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
