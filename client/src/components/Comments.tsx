import { useEffect, useReducer, useState } from 'react'
import newCommentReducer from '../reducers/newCommentReducer'
import host from '../api/host'
import { Link } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi2'
import { usePostsContext } from '../contexts/PostsContext'
import { useUserContext } from '../contexts/UserContext'
import ValidateComments from '../hooks/validateComments'


const base = {comment: ''}

function Comments({comments_id, post_id}: {comments_id: string, post_id: string}) {
  const {stateUser} = useUserContext()
  const {dispatchPost} = usePostsContext()
  const [state, dispatch] = useReducer(newCommentReducer, base)
  const [allComments, setAllComments] = useState({})

  function joinCommentWithOwner(data: any) {
    return data.comments.map((comm: any) => {
      for(let owner of data.owner) {
        if (comm.user_id === owner._id) {
          return { ...owner,...comm}
        }
      }
    })
  }

  async function fetchAllComments() {
    let data = await ValidateComments.fetch(comments_id)
    if (!data) return 
    data.comments = joinCommentWithOwner(data)
    setAllComments(data)
  }

  async function handleSubmitComment(e: any) {
    e.preventDefault()
    const data = await ValidateComments.create(state.comment, post_id)
    if (!data) return
    data.comments = joinCommentWithOwner(data)
    setAllComments(data)
    dispatch({type: 'clear'})
    dispatchPost({type: 'updateCommentsLocal', payload: [post_id, 'add']})
  }

  async function handleDeleteComment(specific_id: string) {
    const data = await ValidateComments.remove(allComments?._id, specific_id)
    if (!data) return
    // locally delete comment
    const newList = allComments.comments.filter(item => item._id !== specific_id)
    setAllComments({...allComments, comments: newList})
    dispatchPost({type: 'updateCommentsLocal', payload: [post_id, 'sub']})
  }

  useEffect(() => {
    fetchAllComments()
  }, [])

  return (
    <div className="">
      <form onSubmit={handleSubmitComment} className="">
        <input
          type="text"
          placeholder="New comment..."
          value={state.comment}
          onChange={e => dispatch({type: 'set', payload: e.target.value})}
          className="w-full bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-md outline-none
            focus:ring-4 ring-yellow-300 dark:ring-yellow-600"
        />
      </form>

      {
        allComments?.comments?.map((item: any, index: any) => (
          <div key={index} className="flex justify-between place-items-center mt-4 pl-8">
            <div className="flex space-x-4 place-items-center">
              <img src={`${host}/users/${item.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
              <div className="">
                <div className="flex place-items-center space-x-4">
                  <Link to={`/user/${item.user_id}`}>
                    <h3 className="font-semibold truncate">{item.name}</h3>
                  </Link>
                  <p className="text-xs">{allComments.createdAt.split('T')[0]}</p>
                </div>
                <p className="">{item.comment}</p>
              </div>
            </div>

            {
              item.user_id === stateUser._id
              ? (<button onClick={() => handleDeleteComment(item._id)} className="text-xl hover:text-red-500 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md p-2">
                <HiOutlineTrash />
              </button> ) : null
            }
          </div>
        ))
      }
    </div>
  )
}

export default Comments