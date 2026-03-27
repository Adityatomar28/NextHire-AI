import {useContext} from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    //main use case of hook is to main the flow 
    // jbh user login kr rha hoga toh login krne k liye api call kr rha hoga toh loading horhi hogi toh loading dekhane hogi jbh tk response nhi aajata  dekhane k liye 

    const handleLogin = async({email,password}) => {
        setLoading(true) //loading dekhane k kaam ui k hai
        //Data k andr user bhi aayega in backend as we are returning the user during api call
       try {
         const data = await login({email,password}) //api call kr rhe hai yha
         console.log("Login data:", data)
         setUser(data.data.user)
         return { success: true }
       } catch (err) {
        console.log(err)
        return { success: false }
       }finally{
         setLoading(false)
       }
       
    }
    const handleRegister = async ({username,email,password}) => {
        setLoading(true)
        const data = await register({username,email,password})
        setUser(data.user)
        setLoading(false)
    }
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }
    useEffect(() => {
        const getAndSetUser = async() => {
        try {
        const data = await getMe()
        setUser(data.user)

        } catch (err){}finally{
            setLoading(false)
        }
        getAndSetUser()
        } 
    },[])
    return {user,loading,handleRegister,handleLogin,handleLogout}
}

//using this hook in pages ->login.jsx