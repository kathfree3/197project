// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'
import { login } from '../routecalls/routecalls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <FullPage>
      <Form>
        <h2>Log in</h2>
        <Label> Username: </Label>
        <Input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <Label> Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Button type="button" onClick={() => login(navigate, username, password)}> Login </Button>
        <p>
          Dont have an account?
          {' '}
          <Link to="/signup">Sign up!</Link>
        </p>
      </Form>
    </FullPage>
  )
}

export default Login
