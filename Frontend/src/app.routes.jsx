import { createBrowserRouter } from "react-router";
import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";
import Protected from "./Features/auth/components/Protected";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />   // 👈 default page
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },{
    path:"/",
    element:<Protected><h1>Home page</h1></Protected>
  }
])




//kis route p konsa element dekhana hai
        //abh iss route ko use krna hai toh then goto App.jsx