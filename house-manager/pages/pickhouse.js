// package imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// local imports
import EnterPassword from '../components/EnterHousePassword'
import { getHouses, createHouse } from '../components/routecalls'

// style
import { page, createbutton } from '../styles/utils.module.css'

const PickHouse = () => {
  const [houseOptions, setHouseOptions] = useState([])
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  // set up page
  useEffect(() => {
    const setup = async () => setHouseOptions(await getHouses())
    setup()
  }, [])

  // map house object to a enterpassword component
  const display = house => {
    const { _id, address: addy } = house
    return (
      <div key={_id}>
        {`${addy}   `}
        <EnterPassword house={house} />
      </div>
    )
  }

  return (
    <div className={page}>
      <h3> Pick a house </h3>
      {houseOptions.map(h => display(h))}
      <hr />
      <h3> House not registered yet? Create one below: </h3>
      <form>
        <label> Address: </label>
        <input value={address} type="text" onChange={e => setAddress(e.target.value)} />
        <label> House Password: </label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <button className={createbutton} type="button" onClick={() => createHouse(router, address, password)}>
          Create house
        </button>
      </form>
    </div>
  )
}

export default PickHouse
