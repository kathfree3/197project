// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// local imports
import {
  Button, Form, Label, Input, FullPage,
} from '../../GlobalStyles'
import EnterPassword from './EnterHousePassword'

const PickHouse = () => {
  const [houseOptions, setHouseOptions] = useState([])
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const setup = async () => {
      const { data } = await axios.get('/account/gethouses')
      setHouseOptions(data)
    }
    setup()
  }, [])

  const submit = async () => {
    const { data } = await axios.post('/account/createhouse', { address, password })
    // eslint-disable-next-line no-alert
    return data.success ? navigate('/') : alert(data.msg)
  }

  return (
    <FullPage>
      <h2> Pick a house </h2>
      {houseOptions.map(h => (
        <div key={h._id}>
          {h.address}
          <EnterPassword house={h} />
        </div>
      ))}
      <h2> House not registered yet? Create one below: </h2>
      <Form>
        <Label> Address: </Label>
        <Input value={address} type="text" onChange={e => setAddress(e.target.value)} />
        <Label> House Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Button type="button" onClick={() => submit()}> Create house </Button>
      </Form>
    </FullPage>
  )
}

export default PickHouse
