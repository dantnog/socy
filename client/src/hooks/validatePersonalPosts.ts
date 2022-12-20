import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import getPersonalPosts from '../api/posts/getPersonalPosts';


async function validatePersonalPosts() {
  const res = await getPersonalPosts()

  if (res.status !== 200) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validatePersonalPosts

