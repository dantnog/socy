import axios from 'axios'
import host from '../host'


async function fetchProfileData(id: string) {
  let response = {status: 500, message: 'Failed to search', data: {profile: {}, posts: []}}

  await axios.get(`${host}/users/profile/${id}`,{
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
      data: {profile: {}, posts: []}
    })

  return response
}

export default fetchProfileData