import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import deleteComment from '../api/posts/deleteComment';


async function validateDeleteComment(comment_id: string, specific_id: string) {
  if (!comment_id || !specific_id) return

  const res = await deleteComment(comment_id, specific_id)

  if (res.status === 401) error(res.message)
  else if (res.status === 403) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)

  return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateDeleteComment