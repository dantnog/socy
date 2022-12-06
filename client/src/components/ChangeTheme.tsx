import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import Button from "./Button";

function ChangeTheme() {
  const [dark, setDark] = useState(false)

  function handleTheme() {
    document.documentElement.classList.toggle('dark')
    dark 
    ? localStorage.setItem('dark', 'false')
    : localStorage.setItem('dark', 'true')
    setDark(!dark)
  }

  useEffect(() => {
    const isDark = localStorage.getItem('dark')
    if (isDark === 'true') {
      setDark(true)
      document.documentElement.classList.toggle('dark')
    }
  }, [])

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