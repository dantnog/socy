import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import fetchComments from '../api/posts/fetchComments';


async function validateAllComments(comments_id: string) {
	if (!comments_id) return

  const res = await fetchComments(comments_id)

  if (res.status === 401) error(res.message)
  else if (res.status === 403) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateAllComments


