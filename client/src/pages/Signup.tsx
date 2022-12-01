import { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import validateSignup from "../hooks/validateSignup"
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../contexts/UserContext"
import formReducer from "../reducers/FormReducer"
import File from "../components/File"


const formBase = {name: '', email: '', password: '', confirm: '', image: undefined}

function Signup() {
  const {dispatch} = useUserContext()
  const [form, formDispatch] = useReducer(formReducer, formBase)
  const nav = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateSignup(form)
    if (!res?.data) return
    dispatch({type: 'setUser', payload: res.data})
    formDispatch({type: 'clear'})
    nav('/home')
  }

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 flex flex-col space-y-4 rounded-lg" encType="mult">
        <h2 className="text-3xl my-2 text-yellow-300 dark:text-yellow-600 font-semibold">
          Sign up
        </h2>
        <Input name="name" type="text" placeholder="Your name" 
          value={form.name} onChange={formDispatch} />
        <Input name="email" type="text" placeholder="Your email" 
          value={form.email} onChange={formDispatch} />
        <Input name="password" type="password" placeholder="Your password" 
          value={form.password} onChange={formDispatch} />
        <Input name="confirm" type="password" placeholder="Confirm your password" 
          value={form.confirm} onChange={formDispatch} />
        <p>Profile picture</p>
        <File name="image" id="image" onChange={formDispatch} />
        <Button name="Sign up" type="submit" theme={1} />
        <Link to="/login"><Button name="Log in" type="button" theme={2} /></Link>
      </form>
    </div>
  )
}

export default Signup