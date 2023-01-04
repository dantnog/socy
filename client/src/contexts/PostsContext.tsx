import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import ValidatePosts from "../hooks/validatePosts";
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
    const data = await ValidatePosts.fetchAll()
    if (!data) return
    dispatchPost({type: 'set', payload: data})
    setIsPersonalPosts(false)
  }

  async function fetchPersonalPosts() {
    const data = await ValidatePosts.fetchPersonal()
    if (!data) return
    dispatchPost({type: 'set', payload: data})
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