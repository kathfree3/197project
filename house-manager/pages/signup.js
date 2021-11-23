// package imports
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// local imports
import { signup } from '../components/routecalls'
import { createbutton, page } from '../styles/utils.module.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  return (
    <div className={page}>
      <form>
        <h2>Sign up</h2>
        <label> Account Username: </label>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <label> Name: </label>
        <input value={name} type="text" onChange={e => setName(e.target.value)} />
        <label> Password: </label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <p>
          {'Already have an account? '}
          <Link href="/login">Log in!</Link>
        </p>
      </form>
      <button className={createbutton} onClick={() => signup(router, name, username, password)}> Signup </button>
    </div>
  )
}

export default Signup
