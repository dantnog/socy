import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import validateAllPosts from "../hooks/validateAllPosts";
import validatePersonalPosts from "../hooks/validatePersonalPosts";
import allPostsReducer from "../reducers/AllPostsReducer";
import PostsContextProps from "../types/PostsContextProps";


const PostsContext = createContext({} as PostsContextProps)

export function usePostsContext() {
  return useContext(PostsContext)
}

const PostsBase = {_id: '', message: '', user_id: '', likes: [], likesCount: 0,
  createdAt: '', updateAt: '', owner: {}
}

export function PostsProvider({children}: {children: ReactNode}) {
  const [statePost, dispatchPost] = useReducer(allPostsReducer, [PostsBase])
  const [isPersonalPosts, setIsPersonalPosts] = useState(false)

  async function fetchAllPosts() {
    const allPosts = await validateAllPosts()
    if (allPosts.status !== 200) return
    dispatchPost({type: 'set', payload: allPosts.data})
    setIsPersonalPosts(false)
  }

  async function fetchPersonalPosts() {
    const allPosts = await validatePersonalPosts()
    if (allPosts.status !== 200) return
    dispatchPost({type: 'set', payload: allPosts.data})
    setIsPersonalPosts(true)
  }

  return (
    <PostsContext.Provider value={{statePost, dispatchPost, fetchAllPosts, fetchPersonalPosts,
      isPersonalPosts
    }} >
      {children}
    </PostsContext.Provider>
  )
}