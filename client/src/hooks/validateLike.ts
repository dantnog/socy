import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import setLike from '../api/posts/setLike';
import { ToastConfig } from '../types/ToastProps';


async function validateLike(idToLike: string) {
  const res = await setLike(idToLike)

  if (res.status === 401) error(res.message)
  else if (res.status === 404) error(res.message)
  else if (res.status === 422) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateLike


