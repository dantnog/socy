import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/UserReducer";
import UserContextProps from "../types/UserContextProps";


const UserContext = createContext({} as UserContextProps)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(reducer,
    JSON.parse(localStorage.getItem('user') || '{}'))

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state))
  }, [state])

  return (
    <UserContext.Provider value={{state, dispatch}} >
      {children}
    </UserContext.Provider>
  )
}