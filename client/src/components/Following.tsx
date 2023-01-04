import { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import host from '../api/host'
import { useUserContext } from '../contexts/UserContext'
import validateFollowings from '../hooks/validateFollowings'
import followingUsersReducer from '../reducers/FollowingUsersReducer'


const Base: any = []

function Following() {
  const [stateFollowing, dispatchFollowing] = useReducer(followingUsersReducer, Base)
  const {stateUser, dispatchUser} = useUserContext()
  
  async function handleFollowBtn(idToFollow: string) {
    const data = await validateFollowings.set(idToFollow)
    if (!data) return
    dispatchUser({type: 'updateList', payload: data})
  }

  async function fetchFollowing() {
    if (!stateUser.followlist_id) return
    const data = await validateFollowings.fetch(stateUser.followlist_id)
    if (!data) return
    dispatchFollowing({type: 'set', payload: data})
  }

  useEffect(() => {fetchFollowing()}, [stateUser.followinglist])
  
  
  return (
    <>
    { 
    stateFollowing && stateFollowing.map((item: any, index: number) => (
      <div key={index} className="flex justify-between place-items-center mb-4">
        <div className="flex place-items-center space-x-4">
          <img src={`${host}/users/${item?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
          <Link to={`/user/${item?._id}`}>
            <h3 className="font-semibold truncate">{item?.name}</h3>
          </Link>
        </div>
        <button onClick={() => handleFollowBtn(item._id)} className="px-2 bg-yellow-300 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md">
          {
            stateUser.followinglist?.indexOf(item._id) === -1
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