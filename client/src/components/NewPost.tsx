import { useReducer } from 'react'
import validateNewPost from '../hooks/validateNewPost'
import PostReducer from '../reducers/NewPostReducer'

const PostBase = {message: ''}

function NewPost() {
  const [state, dispatch] = useReducer(PostReducer, PostBase)

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateNewPost(state)
    if (!res?.data) return
    
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
