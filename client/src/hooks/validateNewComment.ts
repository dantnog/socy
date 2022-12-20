import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import createComment from '../api/posts/createComment';


async function validateNewComment(comment: string, post_id: string) {
	if (!comment || !post_id) return

  const res = await createComment(comment, post_id)

  if (res.status === 401) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 403) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateNewComment

