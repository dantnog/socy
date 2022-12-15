import { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom';
import validateLogin from "../hooks/validateLogin";
import { useUserContext } from "../contexts/UserContext";
import formReducer from "../reducers/FormReducer";


const formBase = {email: '', password: ''}

function Login() {
  const {dispatchUser} = useUserContext()
  const [form, formDispatch] = useReducer(formReducer, formBase)
  const nav = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()
    const res = await validateLogin(form)
    if (res?.status !== 200) return
    dispatchUser({type: 'setUser', payload: res.data})
    formDispatch({type: 'clear'})
    nav('/home')
  }

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 flex flex-col space-y-4 rounded-lg">
        <h2 className="text-3xl my-2 text-yellow-300 dark:text-yellow-600 font-semibold">
          Log in
        </h2>
        <Input name="email" type="text" placeholder="Your email" 
          value={form.email} onChange={formDispatch} />
        <Input name="password" type="password" placeholder="Your password" 
          value={form.password} onChange={formDispatch} />
        <Button name="Log in" type="submit" theme={1} />
        <Link to="/signup"><Button name="Sign up" type="button" theme={2} /></Link>
      </form>
    </div>
  )
}

export default Login
