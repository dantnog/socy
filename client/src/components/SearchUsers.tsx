import { useReducer, useState } from 'react'
import host from '../api/host'
import updateUser from '../api/users/updateUser'
import { useUserContext } from '../contexts/UserContext'
import validateSearch from '../hooks/validateSearch'
import validateSetFollow from '../hooks/validateSetFollow'
import othersUsersReducer from '../reducers/OthersUsersReducer'

const PostBase: any = []

function SearchUsers() {
  const [stateOthers, dispatchOthers] = useReducer(othersUsersReducer, PostBase)
  const {state, dispatch} = useUserContext()
  const [name, setName] = useState('')

  async function handleFollowBtn(idToFollow: string) {
    const res = await validateSetFollow(idToFollow)
    if (res.status !== 200) return
    dispatch({type: 'updateList', payload: res.data})
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateSearch(name)
    if (res?.status !== 200) return
    dispatchOthers({type: 'set', payload: res.data})
  }


  return(
    <>
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        className="w-full bg-gray-100 py-1 px-2 dark:bg-gray-800 rounded-md outline-none
        focus:ring-4 ring-yellow-300 dark:ring-yellow-600"
        placeholder="Search by name" 
        value={name} 
        onChange={e => setName(e.target.value) } />
    </form>

    { 
    stateOthers && stateOthers.map((item, index) => (
      <div key={index} className="flex justify-between place-items-center mb-4">
        <div className="flex place-items-center space-x-4">
          <img src={`${host}/users/${item?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
          <h3 className="font-semibold truncate">{item?.name}</h3>
        </div>
        <button onClick={() => handleFollowBtn(item._id)} className="px-2 bg-yellow-300 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md">
          {
            state.followinglist?.indexOf(item._id) === -1
            ? 'Follow'
            : 'Unfollow'
          }
        </button>
      </div>
    ))
    }
    </>
  )
}

export default SearchUsers

