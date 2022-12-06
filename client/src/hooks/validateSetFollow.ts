import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import setFollow from '../api/users/setFollow';
import { ToastConfig } from '../types/ToastProps';


async function validateSetFollow(idToFollow: string) {
  const res = await setFollow(idToFollow)

  if (res.status === 401) error(res.message)
  else if (res.status === 404) error(res.message)
  else if (res.status === 500) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateSetFollow


