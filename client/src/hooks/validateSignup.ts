import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import SignupProps from '../types/SignupProps';
import { ToastConfig } from '../types/ToastProps';

export default async function validateSignup({name, email, password, confirm}: SignupProps) {
  if (!name) return warning("Don't forget the name")
  if (!email) return warning("Don't forget the email")
  if (!password) return warning("Don't forget the password")
  if (!confirm) return warning("Don't forget the confirmation")
  if (password !== confirm) return warning("The passwords doesn't matches")

  // todo api call
  const res = apiSignup({name, email, password})

  if (res.status === 201) success(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)
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