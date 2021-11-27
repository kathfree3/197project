/* eslint-disable no-alert */
import axios from 'axios'

// user log in/ log out methods
export const logout = async router => {
  try {
    await axios.post(`/account/logout`)
    router.push('/login')
  } catch (err) {
    router.push('/login')
  }
}

export const login = async (router, username, password) => {
  const { data } = await axios.post(`/account/login`, { username, password })
  return data.success ? router.push('/home') : alert(data)
}

export const signup = async (router, name, username, password) => {
  const { data } = await axios.post(`/account/signup`, { name, username, password })
  return data.success ? router.push('/pickhouse') : alert(data)
}

export const getUserLoggedin = async () => {
  const { data } = await axios.get(`/account/isloggedin`)
  return data
}

export const whoLoggedIn = async () => {
  const { data } = await axios.get(`/account/userloggedin`)
  return data.loggedin
}

// From the register house router
export const getHouses = async () => {
  const { data } = await axios.get(`/registerhouse/joinoptions`)
  return data
}

export const createHouse = async (router, address, password) => {
  const { data } = await axios.post(`$/registerhouse/create`, { address, password })
  return data.success ? router.push('/home') : alert(data.msg)
}

export const joinHouse = async (router, _id, password) => {
  const { data } = await axios.post(`/registerhouse/join`, { _id, password })
  return data.success ? router.push('/home') : alert(data)
}

// From the chore router
export const getChores = async () => {
  const { data } = await axios.get(`/chores`)
  return data
}

export const toggle = async id => {
  await axios.post(`/chores/${id}/togglecomplete`)
}

export const newChore = async (assignedTo, task, description) => {
  const { data } = await axios.post(`/chores/create`, { assignedTo, task, description })
  return data.success ? alert('Created Chore') : alert('Not a success')
}

export const assignChore = async (choreID, assignTo) => {
  const { data } = await axios.post(`/chores/${choreID}/assign`, { assignTo })
  return !data.success && alert(data.msg)
}

// My house methods
export const getRoomates = async () => {
  const { data } = await axios.get(`/myhouse/members`)
  return data
}

// Laundry router
export const createMachine = async (type, duration) => {
  const { data } = await axios.post(`/laundry/create`, { type, duration })
  return !data.success && alert('Error creating machine')
}

export const getMachines = async () => {
  const { data } = await axios.get(`/laundry/viewall`)
  return data
}

export const startLoad = async id => {
  const { data } = await axios.post(`/laundry/startload/${id}`)
  return data.success ? alert('Laundry Timer Started') : data.err
}

export const stopLoad = async id => {
  const { data } = await axios.post(`/laundry/finishload/${id}`)
  return data.success ? alert('Laundry taken out') : data.msg
}

// fcuntions for authentication
export const needToBeLoggedIn = async context => {
  const { req } = context

  const { username } = req.session

  if (!username) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { username },
  }
}

export const cantBeLoggedIn = async context => {
  const { req } = context
  const { username } = req.session

  if (username) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }
  return {
    props: { },
  }
}
