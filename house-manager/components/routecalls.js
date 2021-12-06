/** ****************************************************************
 * Define all the backend function calls to be used in the different
 * pages and components of the front end application
 * *************************************************************** */

/* eslint-disable no-alert */
import axios from 'axios'

/* *******************************************************************
  Functions for the account route
******************************************************************** */
export const login = async (router, username, password) => {
  const { data } = await axios.post(`/account/login`, { username, password })
  const { success } = data
  return success ? router.push('/home') : alert(data)
}

export const signup = async (router, name, username, password) => {
  const { data } = await axios.post(`/account/signup`, { name, username, password })
  const { success } = data
  return success ? router.push('/pickhouse') : alert(data)
}

// user log in/ log out methods
export const logout = async router => {
  try {
    await axios.post(`/account/logout`)
    router.push('/login')
  } catch (err) {
    router.push('/login')
  }
}

export const getName = async () => {
  const { data } = await axios.get(`/account/loggedin`)
  return data
}

/* *******************************************************************
  Functions for the register house route
******************************************************************** */
export const getHouses = async () => {
  const { data } = await axios.get(`/registerhouse/joinoptions`)
  return data
}

export const createHouse = async (router, address, password) => {
  const { data } = await axios.post(`/registerhouse/create`, { address, password })
  const { success, msg } = data
  return success ? router.push('/home') : alert(msg)
}

export const joinHouse = async (router, _id, password) => {
  const { data } = await axios.post(`/registerhouse/join`, { _id, password })
  const { success } = data
  return success ? router.push('/home') : alert(data)
}

/* *******************************************************************
  Functions for the chores route
******************************************************************** */
export const getChores = async () => {
  const { data } = await axios.get(`/chores`)
  return data
}

export const toggle = async id => {
  await axios.post(`/chores/${id}/togglecomplete`)
}

export const newChore = async (assignedTo, task, description) => {
  const { data } = await axios.post(`/chores/create`, { assignedTo, task, description })
  const { success } = data
  return success ? alert('Created Chore') : alert('Not a success')
}

export const assignChore = async (choreID, assignTo) => {
  const { data } = await axios.post(`/chores/${choreID}/assign`, { assignTo })
  const { success, msg } = data
  return !success && alert(msg)
}

/* *******************************************************************
  Functions for the myhouse route
******************************************************************** */
export const getRoomates = async () => {
  const { data } = await axios.get(`/myhouse/members`)
  return data
}

/* *******************************************************************
  Functions for the laundry route
******************************************************************** */
export const createMachine = async (type, duration) => {
  const { data } = await axios.post(`/laundry/create`, { type, duration })
  const { success } = data
  return !success && alert('Error creating machine')
}

export const getMachines = async () => {
  const { data } = await axios.get(`/laundry/viewall`)
  return data
}

export const startLoad = async id => {
  const { data } = await axios.post(`/laundry/startload/${id}`)
  const { success, err } = data
  return success ? alert('Laundry Timer Started') : alert(err)
}

export const stopLoad = async id => {
  const { data } = await axios.post(`/laundry/finishload/${id}`)
  const { success, msg } = data
  return success ? alert('Laundry taken out') : alert(msg)
}

/* *******************************************************************
  Functions used for getServerSideProps for pages
******************************************************************** */
export const needToBeLoggedIn = async context => {
  const { req } = context
  const { username } = req.session

  if (!username) { // redirect to login
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
  return { // valid
    props: { username },
  }
}

export const cantBeLoggedIn = async context => {
  const { req } = context
  const { username } = req.session

  if (username) {
    return {
      redirect: { destination: '/home', permanent: false },
    }
  }
  return {
    props: { },
  }
}
