import axios from 'axios';
import host from '../host';

export function deleteRequest(route: string) {
  return axios.delete(
    `${host}${route}`,
    { withCredentials: true }
  )
}