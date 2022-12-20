import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import { ToastConfig } from '../types/ToastProps';
import getAllPosts from '../api/posts/getAllPosts';
import getPersonalPosts from '../api/posts/getPersonalPosts';
import fetchProfileData from '../api/users/fetchProfileData';


async function validateProfileData(id: string) {
  const res = await fetchProfileData(id)

  if (res.status !== 200) error(res.message)
  
	return res
}

function error(m: string) {
  toast.error(m, ToastConfig)
}

export default validateProfileData


