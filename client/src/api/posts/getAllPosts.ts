import axios from 'axios'
import PostProps from '../../types/PostProps'
import host from '../host'


async function getAllPosts() {
  let response = {status: 0, message: '', data: []}

  await axios.get(`${host}/posts/all`,
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
      data: []
    })

  return response
}

export default getAllPosts