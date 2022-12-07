import { useEffect } from 'react'
import { usePostsContext } from '../contexts/PostsContext'
import host from "../api/host"
import NewPost from '../components/NewPost'
import validateLike from '../hooks/validateLike'
import { useUserContext } from '../contexts/UserContext'


function CenterBar() {
  const {fetchAllPosts, statePost, dispatchPost} = usePostsContext()
  const {stateUser, dispatchUser} = useUserContext()

  async function handleLike(idToLike: string, localAction: string) {
    const res = await validateLike(idToLike)
    if (res.status !== 200) return
    dispatchUser({type: 'updateLikes', payload: res.data})
    dispatchPost({type: 'updateLikesLocal', payload: [idToLike, localAction]})
  }

  useEffect(() => {
    fetchAllPosts()
  }, [])

  return(
    <>
      <NewPost />
      <div className="">
      {
        statePost?.map((item: any, index: any) => (
          <div key={index} className="p-4 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex space-x-4 place-items-center">
              <img src={`${host}/users/${item.owner[0]?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
              <h3 className="font-semibold truncate">{item.owner[0]?.name}</h3>
              <p className="text-xs">{item.createdAt.split('T')[0]}</p>
            </div>
            <p className="">{item.message}</p>
            <button 
              onClick={() => {
                if (stateUser.likeslist?.indexOf(item._id) === -1) handleLike(item._id, 'add')
                else handleLike(item._id, 'sub')
              }}
              className="px-2 bg-yellow-300 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md"
            >
              {
                stateUser.likeslist?.indexOf(item._id) === -1
                ? 'Like'
                : 'Dislike'
              }
              {' '+item.likesCount}
            </button>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default CenterBar
