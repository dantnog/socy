import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()
  }

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 flex flex-col space-y-4 rounded-lg">
        <h2 className="text-3xl my-2 text-yellow-300 dark:text-yellow-600 font-semibold">
          Sign up
        </h2>
        <Input name="name" type="text" placeholder="Your name" value={name} onChange={setName} />
        <Input name="email" type="text" placeholder="Your email" value={email} onChange={setEmail} />
        <Input name="password" type="password" placeholder="Your password" value={password} onChange={setPassword} />
        <Input name="confirm" type="password" placeholder="Confirm your password" value={confirm} onChange={setConfirm} />
        <Button name="Sign up" type="submit" theme={1} />
        <Link to="/login"><Button name="Log in" type="button" theme={2} /></Link>
      </form>
    </div>
  )
}

export default Signup