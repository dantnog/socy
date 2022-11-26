import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import loginUser from '../api/users/loginUser';
import LoginProps from '../types/LoginProps';
import { ToastConfig } from '../types/ToastProps';

async function validateLogin({email, password}: LoginProps) {
  if (!email) return warning("Don't forget the email")
  if (!password) return warning("Don't forget the password")

  const res = await loginUser({email, password})

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

export default validateLogin