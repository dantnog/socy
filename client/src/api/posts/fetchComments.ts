import axios from 'axios'
import host from '../host'


async function fetchComments(comments_id: string) {
  let response = {status: 0, message: '', comments: []}

  await axios.get(`${host}/posts/comments/${comments_id}`, 
  {
    withCredentials: true
  })
    .then(res => response = {
      status: res.status,
      message: res.data.message,
      comments: res.data.data
      })
    .catch(err => response = {
      status: err.response?.status, 
      message: err.response?.data.message,
      comments: []
    })

  return response
}

export default fetchComments