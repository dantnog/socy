import { useEffect, useReducer } from 'react'
import host from '../api/host'
import { useUserContext } from '../contexts/UserContext'
import validateFetchFollowing from '../hooks/validateFetchFollowing'
import validateSetFollow from '../hooks/validateSetFollow'
import followingUsersReducer from '../reducers/FollowingUsersReducer'


const Base: any = []

function Following() {
  const [stateFollowing, dispatchFollowing] = useReducer(followingUsersReducer, Base)
  const {state, dispatch} = useUserContext()
  
  async function handleFollowBtn(idToFollow: string) {
    const res = await validateSetFollow(idToFollow)
    if (res.status !== 200) return
    dispatch({type: 'updateList', payload: res.data})
  }

  async function fetchFollowing() {
    const res = await validateFetchFollowing(state.followlist_id)
    if (res?.status !== 200) return
    dispatchFollowing({type: 'set', payload: res.data})
  }

  useEffect(() => {fetchFollowing()}, [])
  
  
  return (
    <>
    { 
    stateFollowing && stateFollowing.map((item, index) => (
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

export default Following