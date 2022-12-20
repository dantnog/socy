import PostProps from "../types/PostProps";
import validateLike from "../hooks/validateLike";
import { useUserContext } from "../contexts/UserContext";
import { usePostsContext } from "../contexts/PostsContext";
import validateDeletePost from "../hooks/validateDeletePost";
import { useState } from "react";
import Comments from "./Comments";


function ProfilePost({item, posts, setPosts}: {item: PostProps, posts: [], setPosts: Function}) {
  const {fetchPersonalPosts, isPersonalPosts} = usePostsContext()
  const {stateUser, dispatchUser} = useUserContext()
  const [showComments, setShowComments] = useState(false)

  async function handleLike(idToLike: string, localAction: string) {
    const res = await validateLike(idToLike)
    if (res.status !== 200) return
    dispatchUser({type: 'updateLikes', payload: res.data})
    setPosts(() => {
      // local count
      return posts.map((each: any) => {
        if (each._id === idToLike) {
          if (localAction === 'add') {
            return {...each, likesCount: each.likesCount + 1}
          } else {
            return {...each, likesCount: each.likesCount - 1}
          }
        } else {
          return each 
        }
      })
    })
  }

  async function handleDelete(idToDelete: string) {
    const res = await validateDeletePost(idToDelete)
    if (res.status !== 200) return
    fetchPersonalPosts()
  }

  return (
    <>
      <div className="flex space-x-4 place-items-center">
        <p className="">Post from: {item.createdAt.split('T')[0]}</p>
      </div>
      <p className="">{item.message}</p>
      <div className="space-x-2">
        <button
          onClick={() => setShowComments(!showComments)}
          className="px-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md"
        >
          Comments {item.commentsCount || 0}
        </button>

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

        {
          isPersonalPosts
          ? ( <button className="px-2 bg-red-400 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md"
            onClick={() => handleDelete(item._id)}>
              Delete
            </button> )
          : null
        }
      </div>

      { 
        showComments && (
        <div className="">
          <Comments post_id={item._id} comments_id={item.comments_id || ''} />
        </div>
        )
      }
    </>
  )
}

export default ProfilePost