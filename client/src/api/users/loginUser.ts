import axios from 'axios'
import LoginProps from '../../types/LoginProps'
import host from '../host'


async function loginUser({email, password}: LoginProps) {
  let response = {status: 0, message: ''}

  await axios.post(`${host}/users/login`, {
    email,
    password
  },
  {
    withCredentials: true
  })
    .then(res => response = {status: res.status, message: res.data.message})
    .catch(err => response = {
      status: err.response?.status, message: err.response?.data.message
    })

  return response
}

export default loginUser