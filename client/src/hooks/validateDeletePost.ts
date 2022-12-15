import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import deletePost from '../api/posts/deletePost';
import { ToastConfig } from '../types/ToastProps';

async function validateDeletePost(idToDelete: string) {
  const res = await deletePost(idToDelete)

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

export default validateDeletePost