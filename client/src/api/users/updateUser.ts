import axios from 'axios'
import UpdateProps from '../../types/UpdateProps'
import host from '../host'


async function updateUser({name, description, location, password, image}: UpdateProps) {
  let response = {status: 0, message: '', data: {}}
  
  // FormData is needed to send files
  let fd = new FormData()
  name ? fd.append('name', name) : null
  description ? fd.append('description', description) : null
  location ? fd.append('location', location) : null
  password ? fd.append('password', password) : null
  image ? fd.append('image', image) : null

  await axios.post(`${host}/users/update`, fd,
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

export default updateUser