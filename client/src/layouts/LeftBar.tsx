import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import EditProfile from "../components/EditProfile"
import { useUserContext } from "../contexts/UserContext"
import validateLogout from "../hooks/validateLogout"

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
      <div className="flex place-items-center space-x-4 ">
        <img src="" alt="Picture" className="h-12 w-12 rounded-full overflow-hidden border-2" />
        <h3 className="font-semibold truncate">{state?.name}</h3>
        <button onClick={logout} className="">O</button>
      </div>
      <div className="text-sm ">
        <div className="">
          <p className="">Description: </p>
          <p className="pl-4">Anything...</p>
        </div>
        <div className="">
          <p className="">Location: </p>
          <p className="pl-4">Neverland, Somewhere</p>
        </div>
      </div>
      <div className="flex rounded-md overflow-hidden">
        <Button name="Edit" type="button" theme={3} onClick={toggleEditForm} />
        <span className="bg-gray-200 dark:bg-gray-700 w-1"></span>
        <Button name="My Posts" type="button" theme={3} />
      </div>

      <div ref={form} className="hidden">
        <EditProfile />
      </div>
    </div>
    </>
  )
}

export default LeftBar