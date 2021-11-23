/* eslint-disable no-alert */
import axios from 'axios'

const pre = 'http://localhost:3000'
// user log in/ log out methods
export const logout = async router => {
  try {
    await axios.post(`${pre}/account/logout`)
    router.push('/login')
  } catch (err) {
    console.log('eee')
    router.push('/login')
  }
}

export const login = async (router, username, password) => {
  const { data } = await axios.post(`${pre}/account/login`, { username, password })
  const { e } = await getUserLoggedin()
  return data.success ? router.push('/home') : alert(data)
}

export const signup = async (router, name, username, password) => {
  const { data } = await axios.post(`${pre}/account/signup`, { name, username, password })
  return data.success ? router.push('/pickhouse') : alert(data)
}

export const getUserLoggedin = async () => {
  const { data } = await axios.get(`${pre}/account/isloggedin`)
  return data
}

// From the register house router
export const getHouses = async () => {
  const { data } = await axios.get(`${pre}/registerhouse/joinoptions`)
  return data
}

export const createHouse = async (router, address, password) => {
  const { data } = await axios.post(`${pre}/registerhouse/create`, { address, password })
  return data.success ? router.push('/home') : alert(data.msg)
}

export const joinHouse = async (router, _id, password) => {
  const { data } = await axios.post(`${pre}/registerhouse/join`, { _id, password })
  return data.success ? router.push('/home') : alert(data)
}

// From the chore router
export const getChores = async () => {
  const { data } = await axios.get(`${pre}/chores`)
  return data
}

export const toggle = async id => {
  await axios.post(`${pre}/chores/${id}/togglecomplete`)
}

export const newChore = async (router, assignedTo, task, description) => {
  const { data } = await axios.post(`${pre}/chores/create`, { assignedTo, task, description })
  return data.success ? navigate('/home') : alert(data)
}

export const assignChore = async (choreID, assignTo) => {
  const { data } = await axios.post(`${pre}/chores/${choreID}/assign`, { assignTo })
  return !data.success && alert(data.msg)
}

// My house methods
export const getRoomates = async () => {
  const { data } = await axios.get(`${pre}/myhouse/members`)
  return data
}

// Laundry router
export const createMachine = async (type, duration) => {
  const { data } = await axios.post(`${pre}/laundry/create`, { type, duration })
  return data.success
}

export const getMachines = async () => {
  const { data } = await axios.get(`${pre}/laundry/viewall`)
  return data
}

export const startLoad = async id => {
  const { data } = await axios.post(`${pre}/laundry/startload/${id}`)
  return data.success ? alert('Laundry Timer Started') : data.err
}

export const stopLoad = async id => {
  const { data } = await axios.post(`/laundry/finishload/${id}`)
  return data.success ? alert('Laundry taken out') : data.msg
}
