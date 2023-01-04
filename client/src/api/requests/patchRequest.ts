import axios from 'axios';
import host from '../host';

export function patchRequest(route: string, data: {}, file=false) {
  if (file) {
    return axios.patch(
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
    return axios.patch(
      `${host}${route}`,
      data,
      { withCredentials: true }
    )
  }
}