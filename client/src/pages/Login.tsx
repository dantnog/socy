import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  async function handleSubmit(e: any) {
    e.preventDefault()
/*     const res = await validateLogin({email, password})
    if (!res) return */
    nav('/home')
  }

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 flex flex-col space-y-4 rounded-lg">
        <h2 className="text-3xl my-2 text-yellow-300 dark:text-yellow-600 font-semibold">
          Log in
        </h2>
        <Input name="email" type="text" placeholder="Your email" value={email} onChange={setEmail} />
        <Input name="password" type="password" placeholder="Your password" value={password} onChange={setPassword} />
        <Button name="Log in" type="submit" theme={1} />
        <Link to="/signup"><Button name="Sign up" type="button" theme={2} /></Link>
      </form>
    </div>
  )
}

export default Login