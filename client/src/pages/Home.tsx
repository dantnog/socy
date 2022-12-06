import LeftBar from "../layouts/LeftBar"
import CenterBar from "../layouts/CenterBar"
import RightBar from "../layouts/RightBar"

function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      <div className="hidden md:block">
        <LeftBar />
      </div>
      <div className="md:col-span-2">
        <CenterBar />
      </div>
      <div className="hidden md:block">
        <RightBar />
      </div>
    </div>
  )
}

export default Home
