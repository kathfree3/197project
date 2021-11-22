// package imports
import React, { useState, useEffect } from 'react'
import s from 'styled-components'

// local imports
import { FullPage } from '../../GlobalStyles'

import LaundryMachine from './LaundryMachine'
import NewMachine from './NewMachine'
import { getMachines } from '../routecalls/routecalls'

const LaundryPage = () => {
  const [machines, setMachines] = useState([])

  useEffect(() => {
    const setup = async () => setMachines(await getMachines())
    setup()
    const intervalID = setInterval(() => {
      setup()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <FullPage>
      <Wrapper>
        <div>
          {machines.filter(m => m.type === 'Washer').map(m => <LaundryMachine key={m._id} machine={m} />)}
        </div>
        <div>
          {machines.filter(m => m.type === 'Dryer').map(m => <LaundryMachine key={m._id} machine={m} />)}
        </div>
      </Wrapper>
      <NewMachine />
    </FullPage>
  )
}

export default LaundryPage

const Wrapper = s.div`
  display: flex;
`
