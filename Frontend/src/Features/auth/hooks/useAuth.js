import {useContext} from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    //main use case of hook is to main the flow 
    // jbh user login kr rha hoga toh login krne k liye api call kr rha hoga toh loading horhi hogi toh loading dekhane hogi jbh tk response nhi aajata  dekhane k liye 

    const handleLogin = async({email,password}) => {
        setLoading(true) //loading dekhane k kaam ui k hai
        //Data k andr user bhi aayega in backend as we are returning the user during api call
        const data = await login({email,password})
        setUser(data.user)
        setLoading(false)

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
}