import axios from 'axios'
import host from '../host'


async function deleteUser() {
  let response = {status: 500, message: 'Failed to logout'}

  await axios.delete(`${host}/users/delete`,{
    withCredentials: true
  })
    .then(res => response = {
      status: res.status, 
      message: res.data.message,
    })
    .catch(err => response = {
      status: err.response?.status,
      message: err.response?.data.message,
    })

  return response
}

export default deleteUser