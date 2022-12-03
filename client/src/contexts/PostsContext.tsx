import { createContext, ReactNode, useContext, useReducer } from "react";
import userReducer from "../reducers/UserReducer";
import PostsContextProps from "../types/PostsContextProps";


const PostsContext = createContext({} as PostsContextProps)

export function usePostsContext() {
  return useContext(PostsContext)
}

export function UserProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(userReducer, [])

  return (
    <PostsContext.Provider value={{state, dispatch}} >
      {children}
    </PostsContext.Provider>
  )
}