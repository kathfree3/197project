// package imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// local imports
import {
  Button, Form, Label, Input, FullPage, Create,
} from '../../GlobalStyles'
import EnterPassword from './EnterHousePassword'
import { getHouses, createHouse } from '../routecalls/routecalls'

const PickHouse = () => {
  const [houseOptions, setHouseOptions] = useState([])
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const setup = async () => {
      setHouseOptions(await getHouses())
    }
    setup()
  }, [])

  return (
    <FullPage>
      <h3> Pick a house </h3>
      {houseOptions.map(h => (
        <div key={h._id}>
          {h.address}
          <EnterPassword house={h} />
        </div>
      ))}
      <h3> House not registered yet? Create one below: </h3>
      <Form>
        <Label> Address: </Label>
        <Input value={address} type="text" onChange={e => setAddress(e.target.value)} />
        <Label> House Password: </Label>
        <Input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <Create type="button" onClick={() => createHouse(navigate, address, password)}> Create house </Create>
      </Form>
    </FullPage>
  )
}

export default PickHouse
