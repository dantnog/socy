import { useReducer } from "react"
import { useUserContext } from "../contexts/UserContext"
import validateUpdate from "../hooks/validateUpdate"
import formReducer from "../reducers/FormReducer"
import Button from "./Button"
import File from "./File"
import Input from "./Input"

const formBase = {name: '', description: '', location: '', password: '', confirm: ''}

function EditProfile() {
  const {dispatch} = useUserContext()
  const [form, formDispatch] = useReducer(formReducer, formBase)

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateUpdate(form)
    if (!res?.data) return
    dispatch({type: 'setUser', payload: res.data})
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4" encType="mult">
      <h2 className="text-yellow-300 dark:text-yellow-600 font-semibold">
        Fill what you want to edit
      </h2>
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
  )
}

export default EditProfile
