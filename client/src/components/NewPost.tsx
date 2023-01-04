import { useReducer } from 'react'
import { usePostsContext } from '../contexts/PostsContext'
import ValidatePosts from '../hooks/validatePosts'
import PostReducer from '../reducers/NewPostReducer'

const PostBase = {message: ''}

function NewPost() {
  const [state, dispatch] = useReducer(PostReducer, PostBase)
  const {fetchAllPosts} = usePostsContext()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await ValidatePosts.create(state.message)
    if (!res) return
    fetchAllPosts()
  }

  return(
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        className="w-full bg-gray-100 py-1 px-2 dark:bg-gray-800 rounded-md outline-none
        focus:ring-4 ring-yellow-300 dark:ring-yellow-600"
        placeholder="Write here..." 
        value={state.message} 
        onChange={e => dispatch({type: 'message', payload: e.target.value})} />
    </form>
  )
}

export default NewPost
