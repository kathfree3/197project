import axios from 'axios'

export const logout = async navigate => {
  await axios.post('/account/logout')
  navigate('/login')
}

export const toggle = async id => {
  await axios.post(`/chores/${id}/togglecomplete`)
}

export const login = async (navigate, username, password) => {
  const { data } = await axios.post('/account/login', { username, password })
  // eslint-disable-next-line no-alert
  return data.success ? navigate('/') : alert(data.msg)
}

export const signup = async (navigate, name, username, password) => {
  const { data } = await axios.post('/account/signup', { name, username, password })
  // eslint-disable-next-line no-alert
  return data.success ? navigate('/pickhouse') : alert(data.msg)
}

// get all houses
export const getHouses = async () => {
  const { data } = await axios.get('/account/gethouses')
  return data
}

export const createHouse = async (navigate, address, password) => {
  const { data } = await axios.post('/account/createhouse', { address, password })
  // eslint-disable-next-line no-alert
  return data.success ? navigate('/') : alert(data.msg)
}

export const joinHouse = async (navigate, _id, password) => {
  const { data } = await axios.post('/account/joinhouse', { _id, password })
  // eslint-disable-next-line no-alert
  return data.success ? navigate('/') : alert(data)
}

export const getChores = async () => {
  const { data } = await axios.get('/chores')
  return data
}

export const getUserLoggedin = async () => {
  const { data } = await axios.get('/account/isloggedin')
  return data
}

export const newChore = async (navigate, assignedTo, task, description) => {
  const { data } = await axios.post('/chores/create', { assignedTo, task, description })
  return data.success ? navigate('/') : alert(data)
}

export const getRoomates = async () => {
  const { data } = await axios.get('/myhouse//members')
  return data
}

export const assignChore = async (choreID, assignTo) => {
  const { data } = await axios.post(`/chores/${choreID}/assign`, { assignTo })
  // eslint-disable-next-line no-alert
  return !data.success && alert(data.msg)
}
