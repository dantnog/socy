import axios from 'axios'
import LoginProps from '../../types/LoginProps'
import host from '../host'


async function loginUser({email, password}: LoginProps) {
  let response = {status: 0, message: '', data: {}}

  await axios.post(`${host}/users/login`, {
    email,
    password
  },
  {
    withCredentials: true
  })
    .then(res => response = {
      status: res.status, 
      message: res.data.message,
      data: res.data.data
    })
    .catch(err => response = {
      status: err.response?.status,
      message: err.response?.data.message,
      data: {}
    })

  return response
}

export default loginUser