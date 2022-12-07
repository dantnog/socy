import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import userReducer from "../reducers/UserReducer";
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
  const [stateUser, dispatchUser] = useReducer(userReducer, firstLoad())

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(stateUser))
  }, [stateUser])

  return (
    <UserContext.Provider value={{stateUser, dispatchUser}} >
      {children}
    </UserContext.Provider>
  )
}