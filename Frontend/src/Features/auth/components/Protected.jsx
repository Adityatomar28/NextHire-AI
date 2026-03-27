import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import React from "react";

const Protected = ({children}) => {
    const {loading,user} = useAuth()
    const navigate = useNavigate()

    if(loading){
    return (<main><h1>Loading.....</h1></main>)
    }
    //agr context m user hi nhi hai toh mtlb user exist hi nhi krta
    if(!user){
    return <Navigate to={'/login'}/>
    }
    return children
    

}

export default Protected;