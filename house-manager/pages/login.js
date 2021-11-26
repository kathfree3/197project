// package imports
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// local imports
import { login, cantBeLoggedIn } from '../components/routecalls'
import { page, button } from '../styles/utils.module.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter() 
  return (
    <div className={page}>
      <form>
        <h2>Log in</h2>
        <label> Username: </label>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <label> Password: </label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <button className={button} type='button' onClick={() => login(router, username, password)}> Login </button>
        <p>
          {'Dont have an account? '}
          <Link href="/signup">Sign up!</Link>
        </p>
      </form>
    </div>
  )
}

export default Login

export async function getServerSideProps(context) {
  return cantBeLoggedIn(context)
}
