import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/UserReducer";
import UserContextProps from "../types/UserContextProps";


const UserContext = createContext({} as UserContextProps)

export function useUserContext() {
  return useContext(UserContext)
}

function firstLoad() {
  const user = localStorage.getItem('user')
  if (!user) return {}
  return JSON.parse(user)
}


export function UserProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(reducer, firstLoad())

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state))
  }, [state])

  return (
    <UserContext.Provider value={{state, dispatch}} >
      {children}
    </UserContext.Provider>
  )
}