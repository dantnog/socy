import LeftBar from "../layouts/LeftBar"
import CenterBar from "../layouts/CenterBar"
import RightBar from "../layouts/RightBar"

function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
      <div className="hidden md:block overflow-scroll max-h-screen p-4">
        <LeftBar />
      </div>
      <div className="md:col-span-2 overflow-scroll max-h-screen py-4 px-4 sm:px-2">
        <CenterBar />
      </div>
      <div className="hidden md:block overflow-scroll max-h-screen p-4 ">
        <RightBar />
      </div>
    </div>
  )
}

export default Home
