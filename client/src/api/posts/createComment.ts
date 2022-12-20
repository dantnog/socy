import axios from 'axios'
import host from '../host'


async function createComment(comment: string, post_id: string) {
  let response = {status: 0, message: '', comments: []}

  await axios.post(`${host}/posts/comments`, {
    post_id,
    comment
  }, 
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

export default createComment