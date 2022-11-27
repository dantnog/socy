import axios from 'axios'
import SignupProps from '../../types/SignupProps'
import host from '../host'


async function signupUser({name, email, password, image}: SignupProps) {
  let response = {status: 0, message: '', data: {}}

  // FormData is needed to send files
  let fd = new FormData()
  fd.append('name', name)
  fd.append('email', email)
  fd.append('password', password)
  image ? fd.append('image', image) : null

  await axios.post(`${host}/users/signup`, fd, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
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

export default signupUser