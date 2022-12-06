import { useRef } from "react"
import { IoSearch } from "react-icons/io5"
import { FaListUl } from "react-icons/fa"
import Button from "../components/Button"
import SearchUsers from "../components/SearchUsers"
import Following from "../components/Following"

function RightBar() {
  const search = useRef(null)
  const following = useRef(null)

  function toggleSearch() {
    search.current?.classList.toggle('hidden')
    following.current?.classList.add('hidden')
  }

  function toggleFollowing() {
    following.current?.classList.toggle('hidden')
    search.current?.classList.add('hidden')
  }

  return (
    <>
    <div className="space-y-4">
      <h2 className="font-semibold">
        People
      </h2>
      <div className="flex rounded-md overflow-hidden">
        <Button name="Search" type="button" theme={3} onClick={toggleSearch}>
          <IoSearch className="mr-2 text-lg"/>
        </Button>
        <span className="bg-gray-200 dark:bg-gray-700 w-1"></span>
        <Button name="Following" type="button" theme={3} onClick={toggleFollowing}>
          <FaListUl className="mr-2 text-lg"/>
        </Button>
      </div>
      <div ref={search} className="">
        <SearchUsers />
      </div>
      <div ref={following} className="hidden">
        <Following />
      </div>
    </div>
    </>
  )
}

export default RightBar