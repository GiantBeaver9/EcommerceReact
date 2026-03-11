import React, { useContext, useState } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null)

  const loginUser = (email) => {
    setMyUser({ name: email.split('@')[0], email })
  }

  const logoutUser = () => {
    setMyUser(null)
  }

  return (
    <UserContext.Provider value={{ myUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
