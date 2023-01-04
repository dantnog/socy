import UsersApi from '../api/usersApi';
import showToast from './showToast';

async function validateSearch(name: string) {
  if (!name) return
  const res = await UsersApi.searchUser(name)
  showToast(res.status, res.message, false)
  return res.data
}

export default validateSearch

