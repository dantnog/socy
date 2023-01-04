import axios from 'axios';
import host from '../host';

export function postRequest(route: string, data: {}, file=false) {
  if (file) {
    return axios.post(
      `${host}${route}`,
      data,
      { 
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true 
      }
    )
  } else {
    return axios.post(
      `${host}${route}`,
      data,
      { withCredentials: true }
    )
  }

}