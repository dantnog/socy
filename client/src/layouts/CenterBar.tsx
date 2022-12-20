import { useEffect } from 'react'
import { usePostsContext } from '../contexts/PostsContext'
import NewPost from '../components/NewPost'
import Post from '../components/Post'


function CenterBar() {
  const {fetchAllPosts, statePost} = usePostsContext()

  useEffect(() => {
    fetchAllPosts()
  }, [])

  return(
    <>
      <NewPost />
      <div className="">
      {
        statePost?.map((item: any, index: any) => (
          <div key={index} className="p-4 space-y-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <Post {...item}/>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default CenterBar
