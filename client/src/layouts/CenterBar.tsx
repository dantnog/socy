import { useEffect } from 'react'
import NewPost from '../components/NewPost'
import { usePostsContext } from '../contexts/PostsContext'
import host from "../api/host"


function CenterBar() {
  const {fetchAllPosts, state} = usePostsContext()

  useEffect(() => {
    fetchAllPosts()
  }, [])

  return(
    <>
      <NewPost />
      <div className="">
      {
        state?.map((item, index) => (
          <div key={index} className="p-4 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex space-x-4 place-items-center">
              <img src={`${host}/users/${item.owner[0]?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
              <h3 className="font-semibold truncate">{item.owner[0]?.name}</h3>
              <p className="text-xs">{item.createdAt.split('T')[0]}</p>
            </div>
            <p className="">{item.message}</p>
            <button 
              onClick={() => {}}
              className="px-2 bg-yellow-300 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md"
            >
              Likes {item.likesCount}
            </button>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default CenterBar
