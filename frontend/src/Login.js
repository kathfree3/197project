// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../GlobalStyles'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    // eslint-disable-next-line no-alert
    return data.success ? navigate('/') : alert(data.msg)
  }

  return (
    <FullPage>
      <Form>
        <h2>Log in</h2>
        <Label> Username: </Label>
        <Input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <Label> Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Button type="button" onClick={() => submit()}> Login </Button>
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
