import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import getAllPosts from '../api/posts/getAllPosts';


async function validateAllPosts() {
  const res = await getAllPosts()

  if (res.status !== 200) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateAllPosts

