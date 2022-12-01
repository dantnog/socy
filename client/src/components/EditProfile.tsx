import { useReducer, useRef } from "react"
import { useUserContext } from "../contexts/UserContext"
import validateUpdateUser from "../hooks/validateUpdateUser"
import formReducer from "../reducers/FormReducer"
import Button from "./Button"
import File from "./File"
import Input from "./Input"
import { HiOutlineTrash } from 'react-icons/hi2'
import validateDeleteUser from "../hooks/validateDeleteUser"
import { useNavigate } from "react-router-dom"

const formBase = {name: '', description: '', location: '', password: '', confirm: ''}

function EditProfile() {
  const {dispatch} = useUserContext()
  const [form, formDispatch] = useReducer(formReducer, formBase)
  const deleteForm = useRef<any>(null)
  const editForm = useRef<any>(null)
  const nav = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateUpdateUser(form)
    if (!res?.data) return
    dispatch({type: 'setUser', payload: res.data})
  }

  function switchForms() {
    deleteForm.current.classList.toggle('hidden')
    editForm.current.classList.toggle('hidden')
  }

  async function handleDelete(e: any) {
    e.preventDefault()
    const res = await validateDeleteUser()
    if (res.status !== 200) return  
    nav('/')
  }

  return (
    <>
    <form ref={editForm} onSubmit={handleSubmit} className="flex flex-col space-y-4" encType="mult">
      <div className="flex place-items-center justify-between">
        <h2 className="text-yellow-300 dark:text-yellow-600 font-semibold">
          Fill only what to edit
        </h2>
        <button onClick={switchForms} className="text-xl hover:text-red-500 hover:bg-gray-200 hover:dark:bg-gray-800 rounded-md p-2">
          <HiOutlineTrash/>
        </button>
      </div>
      <Input name="name" type="text" placeholder="Change your name" 
        value={form.name} onChange={formDispatch} />
      <Input name="description" type="text" placeholder="Change your description" 
        value={form.description} onChange={formDispatch} />
      <Input name="location" type="text" placeholder="Change your location" 
        value={form.location} onChange={formDispatch} />
      <Input name="password" type="password" placeholder="Change your password" 
        value={form.password} onChange={formDispatch} />
      <Input name="confirm" type="password" placeholder="Confirm your new password" 
        value={form.confirm} onChange={formDispatch} />
      <p>Profile picture</p>
      <File name="image" id="image" onChange={formDispatch} />
      <Button name="Update" type="submit" theme={1} />
    </form>

    <form ref={deleteForm} onSubmit={handleDelete} className="hidden space-y-4">
      <h2 className="text-yellow-300 dark:text-yellow-600 font-semibold">
        Do you want to delete your account?
      </h2>
      <Button onClick={switchForms} name="No, cancel" type="button" theme={2} />
      <Button name="Yes, delete" type="submit" theme={4} />
    </form>
    </>
  )
}

export default EditProfile
