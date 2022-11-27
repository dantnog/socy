import LoginProps from "./LoginProps"

interface SignupProps extends LoginProps {
  name: string 
  confirm?: string
  image?: File
}

export default SignupProps