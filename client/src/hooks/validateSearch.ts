import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import searchUser from '../api/users/searchUser';
import { ToastConfig } from '../types/ToastProps';

async function validateSearch(name: string) {
  if (!name) return

  const res = await searchUser(name)

  if (res.status === 401) error(res.message)
  else if (res.status === 404) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)

  return res
}

function success(m: string) {
  toast.success(m, ToastConfig)
}
function warning(m: string) {
  toast.warning(m, ToastConfig)
}
function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateSearch

