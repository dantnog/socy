import { ReactNode } from "react"

type ButtonProps = {
  name?: string 
  type: 'button' | 'submit'
  theme: 1 | 2 | 3
  onClick?: Function 
  children?: ReactNode
}

export default ButtonProps