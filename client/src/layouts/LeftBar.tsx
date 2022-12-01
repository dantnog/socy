import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import EditProfile from "../components/EditProfile"
import { useUserContext } from "../contexts/UserContext"
import validateLogout from "../hooks/validateLogout"
import { IoExitOutline, IoBookOutline } from 'react-icons/io5' 
import { FiEdit } from 'react-icons/fi' 
import host from "../api/host"


function LeftBar() {
  const {state} = useUserContext()
  const nav = useNavigate()

  async function logout() {
    const res = await validateLogout()
    if (res.status !== 200) return
    nav('/')
  }

  let form = useRef<any>(null)
  function toggleEditForm() {
    form.current?.classList.toggle('hidden')
  }

  return (
    <>
    <div className="space-y-4">
      <div className="flex justify-between place-items-center">
        <div className="flex place-items-center space-x-4">
          <img src={`${host}/users/${state?.picture}`} alt="Picture" className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800" />
          <h3 className="font-semibold truncate">{state?.name}</h3>
        </div>
        <button onClick={logout} className="text-xl hover:text-red-500 hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md p-2 ml-auto">
          <IoExitOutline />
        </button>
      </div>
      <div className="text-sm ">
        <div className="">
          <p className="">Description: </p>
          <p className="pl-4">{state.description || ''}</p>
        </div>
        <div className="">
          <p className="">Location: </p>
          <p className="pl-4">{state.location || ''}</p>
        </div>
      </div>
      <div className="flex rounded-md overflow-hidden">
        <Button name="Edit" type="button" theme={3} onClick={toggleEditForm}>
          <FiEdit className="mr-2"/>
        </Button>
        <span className="bg-gray-200 dark:bg-gray-700 w-1"></span>
        <Button name="Posts" type="button" theme={3} >
          <IoBookOutline className="mr-2 text-lg"/>
        </Button>
      </div>

      <div ref={form} className="hidden">
        <EditProfile />
      </div>
    </div>
    </>
  )
}

export default LeftBar