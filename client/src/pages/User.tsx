import { useUserContext } from "../contexts/UserContext"
import { IoExitOutline, IoReturnUpBack } from 'react-icons/io5' 
import validateLogout from "../hooks/validateLogout"
import { Link, useNavigate, useParams } from "react-router-dom"
import host from "../api/host"
import { usePostsContext } from "../contexts/PostsContext"
import validateLike from "../hooks/validateLike"
import validateDeletePost from "../hooks/validateDeletePost"
import Button from "../components/Button"
import { useEffect, useRef, useState } from "react"
import validateProfileData from "../hooks/validateProfileData"


function User() {
  const {stateUser, dispatchUser} = useUserContext()
  const {statePost, dispatchPost, fetchPersonalPosts, isPersonalPosts} = usePostsContext()
  const [profile, setProfile] = useState({})
  const [posts, setPosts] = useState([])
  const nav = useNavigate()
  const {id} = useParams()
  const imageDialog = useRef(null)

  async function fetchProfileData(id: string) {
    const res = await validateProfileData(id)
    if (res.status !== 200) return
    console.log(res.data)
    setProfile(res.data.profile)
    setPosts(res.data.posts)
  }

  async function handleLike(idToLike: string, localAction: string) {
    const res = await validateLike(idToLike)
    if (res.status !== 200) return
    dispatchUser({type: 'updateLikes', payload: res.data})
    dispatchPost({type: 'updateLikesLocal', payload: [idToLike, localAction]})
  }

  async function handleDelete(idToDelete: string) {
    const res = await validateDeletePost(idToDelete)
    if (res.status !== 200) return
    fetchPersonalPosts()
  }

  async function logout() {
    const res = await validateLogout()
    if (res.status !== 200) return
    dispatchUser({type: 'clear'})
    nav('/')
  }

  function showImage() {
    imageDialog.current?.classList.toggle('hidden')
  }

  useEffect(() => {
    id ? fetchProfileData(id) : null
  }, [])

  return (
    <div className="h-screen max-w-3xl mx-auto overflow-y-scroll">
      <div className="flex justify-between h-64 relative place-items-center overflow-hidden">
        <img src={`${host}/users/${profile?.picture}`} alt="Picture" className="blur w-full object-cover overflow-hidden" />
        <div className="flex absolute place-items-center space-x-4 mx-4 sm:mx-8">
          <img onClick={showImage} src={`${host}/users/${profile?.picture}`} alt="Picture" className="h-36 w-36 cursor-pointer object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
          <h3 className="font-semibold text-2xl text-white truncate">{profile?.name}</h3>
        </div>
      </div>

      <div onClick={showImage} ref={imageDialog} className="hidden fixed top-0 left-0 w-full h-screen bg-black">
        <img src={`${host}/users/${profile?.picture}`} alt="Picture" className="max-w-screen max-h-screen m-auto " />
      </div>

      <div className="mt-4 flex justify-between px-4 ">
        <Link to="/home" >
          <Button name="Back" type="button" theme={2} >
            <IoReturnUpBack className="inline-block text-xl mr-2" />
          </Button>
        </Link>
        <span className="">
          { stateUser._id === profile._id
            ? (<Button name="Exit" type="button" theme={2} onClick={logout} >
                <IoExitOutline className="inline-block text-xl mr-2" />
              </Button>)
            : null
          }
        </span>
      </div>

      <div className="px-4 space-y-4 mt-4">
        <div className="">
          <p className="">Description: </p>
          <p className="">{profile.description || ''}</p>
        </div>
        <div className="">
          <p className="">Location: </p>
          <p className="">{profile.location || ''}</p>
        </div>
      </div>

      <div className="my-4 px-4 ">
      {
        posts?.map((item: any, index: any) => (
          <div key={index} className="p-4 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex space-x-4 place-items-center">
              <img src={`${host}/users/${profile?.picture}`} alt="Picture" className="h-12 w-12 object-cover rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
              <h3 className="font-semibold truncate">{profile?.name}</h3>
              <p className="text-xs">{item.createdAt.split('T')[0]}</p>
            </div>
            <p className="">{item.message}</p>
            <div className="">
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
                stateUser._id === profile._id
                ? ( <button className="px-2 ml-4 bg-red-400 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 text-gray-800 dark:text-gray-100 focus:ring-4 ring-yellow-500/50 rounded-md"
                  onClick={() => handleDelete(item._id)}>
                    Delete
                  </button> )
                : null
              }
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default User