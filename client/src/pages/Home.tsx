import LeftBar from "../layouts/LeftBar"
import CenterBar from "../layouts/CenterBar"
import RightBar from "../layouts/RightBar"
import Button from "../components/Button"
import { IoMdPerson, IoMdMenu, IoMdClose } from "react-icons/io"
import { useRef, useState } from "react"

function Home() {
  const [leftBar, setLeftBar] = useState(false)
  const [rightBar, setRightBar] = useState(false)

  const leftRef = useRef(null)
  const centerRef = useRef(null)
  const rightRef = useRef(null)

  function handleLeftBar() {
    setLeftBar(prev => !prev)
    leftRef.current?.classList.toggle('hidden')
    if (rightBar) {
      rightRef.current?.classList.toggle('hidden')
      setRightBar(false)
      return
    }
    handleCenterBar()
  }

  function handleCenterBar() {
    centerRef.current?.classList.toggle('hidden')
  }

  function handleRightBar() {
    setRightBar(prev => !prev)
    rightRef.current?.classList.toggle('hidden')
    if (leftBar) {
      leftRef.current?.classList.toggle('hidden')
      setLeftBar(false)
      return
    }
    handleCenterBar()
  }

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 ">
      <div className="flex place-items-center sm:hidden fixed left-0 top-0 w-full justify-between h-12 px-4 bg-white dark:bg-gray-900">
        <div className="w-10 rounded-md overflow-hidden">
          <Button type="button" theme={3} onClick={handleLeftBar}>
            {
              !leftBar
              ? <IoMdPerson className="text-2xl" />
              : <IoMdClose className="text-2xl" />
            }
          </Button>
        </div>
        <h2 className="text-2xl font-semibold">SOCY</h2>
        <div className="w-10 rounded-md overflow-hidden">
          <Button type="button" theme={3} onClick={handleRightBar}>
            {
              !rightBar
              ? <IoMdMenu className="text-2xl" />
              : <IoMdClose className="text-2xl" />
            }
          </Button>
        </div>
      </div>


      <div ref={leftRef} className="hidden md:block overflow-scroll max-h-screen pt-14 sm:pt-4 p-4">
        <LeftBar />
      </div>
      <div ref={centerRef} className="md:col-span-2 overflow-scroll max-h-screen pt-14 sm:pt-4 py-4 px-4 sm:px-2">
        <CenterBar />
      </div>
      <div ref={rightRef} className="hidden md:block overflow-scroll max-h-screen pt-14 sm:pt-4 p-4 ">
        <RightBar />
      </div>
    </div>
    </>
  )
}

export default Home
