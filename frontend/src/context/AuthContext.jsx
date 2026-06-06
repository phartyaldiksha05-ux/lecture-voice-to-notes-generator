import React, {createContext, useState, useEffect} from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      // optionally fetch user info
    }
  },[])
  const logout = ()=>{ localStorage.removeItem('token'); setUser(null) }
  return <AuthContext.Provider value={{user,setUser,logout}}>{children}</AuthContext.Provider>
}
