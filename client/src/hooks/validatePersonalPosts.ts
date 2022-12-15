import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import getAllPosts from '../api/posts/getAllPosts';
import getPersonalPosts from '../api/posts/getPersonalPosts';


async function validatePersonalPosts() {
  const res = await getPersonalPosts()

  if (res.status === 200) success(res.message) 
  else if (res.status === 401) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return res
}

function success(m: string) {
  toast.success(m, ToastConfig)
}
function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validatePersonalPosts
