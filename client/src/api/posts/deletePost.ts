import axios from 'axios'
import host from '../host'


async function deletePost(idToDelete: string) {
  let response = {status: 500, message: 'Failed to delete Post'}

  await axios.delete(`${host}/posts/delete/${idToDelete}`,{
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

export default deletePost