import axios from 'axios'
import SignupProps from '../../types/SignupProps'
import host from '../host'


async function signupUser({name, email, password}: SignupProps) {
  let response = {status: 0, message: ''}

  await axios.post(`${host}/users/signup`, {
    name,
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

export default signupUser