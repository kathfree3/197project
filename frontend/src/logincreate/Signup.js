// package imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    const { data } = await axios.post('/account/signup', { name, username, password })
    // eslint-disable-next-line no-alert
    return data.success ? navigate('/pickhouse') : alert(data.msg)
  }

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
        <Button type="button" onClick={() => submit()}> Signup </Button>
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
