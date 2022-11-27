import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import logoutUser from '../api/users/logoutUser';
import { ToastConfig } from '../types/ToastProps';

async function validateLogout() {
  const res = await logoutUser()

  if (res.status === 200) success(res.message) 
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

export default validateLogout