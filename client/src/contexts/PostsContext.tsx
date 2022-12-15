import { createContext, ReactNode, useContext, useReducer } from "react";
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

  async function fetchAllPosts() {
    const allPosts = await validateAllPosts()
    dispatchPost({type: 'set', payload: allPosts.data})
  }

  async function fetchPersonalPosts() {
    const allPosts = await validatePersonalPosts()
    dispatchPost({type: 'set', payload: allPosts.data})
  }

  return (
    <PostsContext.Provider value={{statePost, dispatchPost, fetchAllPosts, fetchPersonalPosts}} >
      {children}
    </PostsContext.Provider>
  )
}