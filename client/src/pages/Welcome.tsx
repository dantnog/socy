import { Link } from "react-router-dom"
import Button from "../components/Button"

function Welcome() {
  return (
    <div className="max-w-2xl min-h-screen mx-auto py-8 grid sm:gap-6 grid-cols-1 sm:grid-cols-2 text-center place-items-center">
      <h1 className="text-8xl font-semibold">SOCY</h1>
      <div className="space-y-6 w-full px-8">
        <h3 className="text-3xl">Welcome!</h3>
        <div className="flex space-x-4">
          <Link to="/signup" className="w-full">
            <Button name="Signup" type="button" theme={1} />
          </Link>
          <Link to="/login" className="w-full">
            <Button name="Login" type="button" theme={1} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome