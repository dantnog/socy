import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import PostProps from "../types/PostProps";
import createPost from '../api/posts/createPost';


async function validateNewPost({message}: PostProps) {
	if (!message) return

  const res = await createPost({message})

  if (res.status === 201) {
		success(res.message) 
		return true
	}
  else if (res.status === 401) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return false
}

function success(m: string) {
  toast.success(m, ToastConfig)
}
function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateNewPost
