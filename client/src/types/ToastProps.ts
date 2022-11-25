import { ToastPosition, Theme, ToastTransition, Flip } from 'react-toastify'

type ToastProps = {
  position: ToastPosition
  autoClose: number
  pauseOnHover: boolean
  closeOnClick: boolean
  draggable: boolean
  theme: Theme
  transition: ToastTransition
}

export const ToastConfig: ToastProps = {
  position: 'top-right',
  autoClose: 2000,
  pauseOnHover: true,
  closeOnClick: true,
  draggable: false,
  theme: 'colored',
  transition: Flip
}