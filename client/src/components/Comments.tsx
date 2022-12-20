import { useEffect, useReducer, useState } from 'react'
import validateNewComment from '../hooks/validateNewComment'
import validateAllComments from '../hooks/validateAllComments'
import newCommentReducer from '../reducers/newCommentReducer'
import host from '../api/host'
import { Link } from 'react-router-dom'


const base = {comment: ''}

function Comments({comments_id, post_id}: {comments_id: string, post_id: string}) {
  const [state, dispatch] = useReducer(newCommentReducer, base)
  const [allComments, setAllComments] = useState([])

  async function fetchAllComments() {
    const res = await validateAllComments(comments_id)
    if (res?.status !== 200) return 
    setAllComments(res.comments)
  }

  async function handleSubmitComment(e: any) {
    e.preventDefault()
    const res = await validateNewComment(state.comment, post_id)
    if (res?.status !== 201) return
    setAllComments(res.comments)
    dispatch({type: 'clear'})
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
          className="w-full bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded-md outline-none
            focus:ring-4 ring-yellow-300 dark:ring-yellow-600"
        />
      </form>

      {
        allComments?.map((item: any, index: any) => (
          <div key={index} className="flex space-x-4 place-items-center mt-4 pl-8">
            <img src={`${host}/users/${item.owner[0]?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
            <div className="">
              <div className="flex place-items-center space-x-4">
                <Link to={`/user/${item.owner[0]?._id}`}>
                  <h3 className="font-semibold truncate">{item.owner[0]?.name}</h3>
                </Link>
                <p className="text-xs">{item.createdAt.split('T')[0]}</p>
              </div>
              <p className="">{item.comments[0].comment}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Comments