import axios from 'axios'
import host from '../host'


async function searchUser(name: string) {
  let response = {status: 500, message: 'Failed to search', data: {}}

  await axios.post(`${host}/users/search`, {
    name
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

export default searchUser