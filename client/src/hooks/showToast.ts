import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';

export default function showToast(status: number, message: string, show=true) {
  if (status >= 200 && status < 300) {
    if (show == true) success(message)
  }
  else if (status >= 400) error(message)
  else warning(message)
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