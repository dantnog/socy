import PostsApi from '../api/postsApi';
import showToast from './showToast';

async function validateLike(idToLike: string) {
  if (!idToLike) return

  const res = await PostsApi.setLike(idToLike)
  showToast(res.status, res.message, false)
	return res.data[0].likeslist[0].list
}

export default validateLike


