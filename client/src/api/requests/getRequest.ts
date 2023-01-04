import axios from 'axios';
import host from '../host';

export function getRequest(route: string) {
  return axios.get(
    `${host}${route}`,
    { withCredentials: true }
  )
}