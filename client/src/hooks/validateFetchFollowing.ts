import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import fetchFollowing from '../api/users/fetchFollowings';
import { ToastConfig } from '../types/ToastProps';

async function validateFetchFollowing(list_id: string) {
  const res = await fetchFollowing(list_id)

  if (res.status === 401) error(res.message)
  else if (res.status === 404) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)

  return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateFetchFollowing


