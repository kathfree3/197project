// package imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// local imports
import EnterPassword from '../components/EnterHousePassword'
import { getHouses, createHouse } from '../components/routecalls'
import { page, createbutton } from '../styles/utils.module.css'

const PickHouse = () => {
  const [houseOptions, setHouseOptions] = useState([])
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  
  useEffect(() => {
    const setup = async () => {
      setHouseOptions(await getHouses())
    }
    setup()
  }, [])

  return (
    <div className={page}>
      <h3> Pick a house </h3>
      {houseOptions.map(h => (
        <div key={h._id}>
          {h.address}
          <EnterPassword house={h} />
        </div>
      ))}
      <h3> House not registered yet? Create one below: </h3>
      <form>
        <label> Address: </label>
        <input value={address} type="text" onChange={e => setAddress(e.target.value)} />
        <label> House Password: </label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <button className={createbutton} type="button" onClick={() => createHouse(router, address, password)}> Create house </button>
      </form>
    </div>
  )
}

export default PickHouse
