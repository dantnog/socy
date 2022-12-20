import { useEffect, useReducer, useState } from 'react'
import validateNewComment from '../hooks/validateNewComment'
import validateAllComments from '../hooks/validateAllComments'
import newCommentReducer from '../reducers/newCommentReducer'
import host from '../api/host'
import { Link } from 'react-router-dom'
import validateDeleteComment from '../hooks/validateDeleteComment'
import { HiOutlineTrash } from 'react-icons/hi2'


const base = {comment: ''}

function Comments({comments_id, post_id}: {comments_id: string, post_id: string}) {
  const [state, dispatch] = useReducer(newCommentReducer, base)
  const [allComments, setAllComments] = useState({})

  async function fetchAllComments() {
    const res = await validateAllComments(comments_id)
    if (res?.status !== 200) return 
    const newRes = {...res.comments[0]}
    // joining owner with their comments
    newRes.comments = newRes.comments.map((comm: any) => {
      for(let owner of newRes.owner) {
        if (comm.user_id === owner._id) {
          return { ...owner,...comm}
        }
      }
    })
    setAllComments(newRes)
  }

  async function handleSubmitComment(e: any) {
    e.preventDefault()
    const res = await validateNewComment(state.comment, post_id)
    if (res?.status !== 201) return
    setAllComments(res.comments)
    dispatch({type: 'clear'})
  }

  async function handleDeleteComment(specific_id: string) {
    const res = await validateDeleteComment(allComments?._id, specific_id)
    if (res?.status !== 200) return
    // locally delete comment
    const newList = allComments.comments.filter(item => item._id !== specific_id)
    setAllComments({...allComments, comments: newList})
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

            <button onClick={() => handleDeleteComment(item._id)} className="text-xl hover:text-red-500 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md p-2">
              <HiOutlineTrash />
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default Comments