// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// local imports
import {
  Create, Form, Label, Input, FullPage,
} from '../../GlobalStyles'
import { signup } from '../routecalls/routecalls'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <FullPage>
      <Form>
        <h2>Sign up</h2>
        <Label> Username: </Label>
        <Input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <Label> Name: </Label>
        <Input value={name} type="text" onChange={e => setName(e.target.value)} />
        <Label> Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Create type="button" onClick={() => signup(navigate, name, username, password)}> Signup </Create>
        <p>
          Already have an account?
          {' '}
          <Link to="/login">Log in!</Link>
        </p>
      </Form>
    </FullPage>
  )
}

export default Signup
