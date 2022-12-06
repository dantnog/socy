import axios from 'axios'
import host from '../host'


async function fetchFollowing(list_id: string) {

  let response = {status: 500, message: 'Failed to fetch following', data: {}}

  await axios.post(`${host}/users/fetchfollowing`, {
    followlist_id: list_id
  },{
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

export default fetchFollowing