import { Children, createContext, useState,useEffect } from "react";
import { getMe } from "./services/auth.api";



export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    // At production it is set at false when we want user to hydrate
    const [loading,setLoading] = useState(true)

useEffect(() => {
 //it Brings current user  data from backend or yhe getMe Function cokkie p depend krta hai data mangwane k liye
  const getAndSetUser = async () => {
    try {
      const data = await getMe()
      setUser(data?.user || null)
    } catch (err) {
      console.log("getMe error:", err)
      setUser(null)
    } finally {
      setLoading(false)   // 🔥 ALWAYS runs
    }
  }

  getAndSetUser()
}, [])
    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
        {children}
        </AuthContext.Provider>
    )

}






