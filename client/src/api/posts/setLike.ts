import axios from 'axios'
import host from '../host'


async function setLike(idToLike: string) {
  let response = {status: 0, message: '', data: {}}

  await axios.post(`${host}/posts/setlike`, {
    idToLike
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

export default setLike