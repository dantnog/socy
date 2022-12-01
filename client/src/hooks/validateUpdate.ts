import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import loginUser from '../api/users/loginUser';
import updateUser from '../api/users/updateUser';
import { ToastConfig } from '../types/ToastProps';
import UpdateProps from '../types/UpdateProps';


async function validateUpdate({name, description, location, password, confirm, image}: UpdateProps) {
  if (!name && !description && !location && !password && !image) return

  if (password && (password !== confirm)) return warning("The passwords doesn't matches")

  const res = await updateUser({name, description, location, password, image})

  if (res.status === 200) success(res.message) 
  else if (res.status === 403) error(res.message)
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

export default validateUpdate