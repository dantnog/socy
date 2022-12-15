import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import Button from "./Button";

function ChangeTheme() {
  const [dark, setDark] = useState(() => {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('dark')
      return true
    } else return false
  })

  function handleTheme() {
    document.documentElement.classList.toggle('dark')
    dark 
    ? localStorage.setItem('dark', 'false')
    : localStorage.setItem('dark', 'true')
    setDark(!dark)
  }


  return (
    <Button type="button" theme={5} onClick={handleTheme}>
      {
      dark
      ? <IoSunny className="text-lg"/>
      : <IoMoon className="text-lg"/>
      }
    </Button>
  )
}

export default ChangeTheme