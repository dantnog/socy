import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import deleteUser from '../api/users/deleteUser';
import { ToastConfig } from '../types/ToastProps';

async function validateDeleteUser() {
  const res = await deleteUser()

  if (res.status === 200) success(res.message) 
  else if (res.status === 401) error(res.message)
  else if (res.status === 403) error(res.message)
  else if (res.status === 500) error(res.message)

  return res
}

function success(m: string) {
  toast.success(m, ToastConfig)
}
function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateDeleteUser