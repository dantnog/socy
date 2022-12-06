import { useRef } from "react"
import Button from "../components/Button"
import SearchUsers from "../components/SearchUsers"

function RightBar() {
  const search = useRef(null)

  function toggleSearch() {
    search.current?.classList.toggle('hidden')
  }

  return (
    <>
    <div className="space-y-4">
      <h2 className="font-semibold">
        People
      </h2>
      <div className="rounded-md overflow-hidden">
        <Button name="Search" type="button" theme={3} onClick={toggleSearch}>

        </Button>
      </div>
      <div ref={search} className="hidden">
        <SearchUsers />
      </div>
    </div>
    </>
  )
}

export default RightBar