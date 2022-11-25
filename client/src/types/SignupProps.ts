import LoginProps from "./LoginProps"

interface SignupProps extends LoginProps {
  name: string 
  confirm?: string
}

export default SignupProps