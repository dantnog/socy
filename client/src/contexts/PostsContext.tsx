import { createContext, ReactNode, useContext, useReducer } from "react";
import validateAllPosts from "../hooks/validateAllPosts";
import allPostsReducer from "../reducers/AllPostsReducer";
import PostsContextProps from "../types/PostsContextProps";


const PostsContext = createContext({} as PostsContextProps)

export function usePostsContext() {
  return useContext(PostsContext)
}

const allPostsBase = {_id: '', message: '', user_id: '', likes: '', likesCount: 0,
  createdAt: '', updateAt: '', owner: []
}

export function PostsProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(allPostsReducer, [allPostsBase])

  async function fetchAllPosts() {
    const allPosts = await validateAllPosts()
    dispatch({type: 'set', payload: allPosts.data})
  }

  return (
    <PostsContext.Provider value={{state, dispatch, fetchAllPosts}} >
      {children}
    </PostsContext.Provider>
  )
}