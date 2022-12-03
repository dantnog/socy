import axios from 'axios'
import PostProps from '../../types/PostProps'
import host from '../host'


async function createPost({message}: PostProps) {
  let response = {status: 0, message: '', data: {}}

  await axios.post(`${host}/posts/create`, {
    message
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

export default createPost