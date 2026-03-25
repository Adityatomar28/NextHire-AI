import { createBrowserRouter } from "react-router";
import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";


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
  }
])




//kis route p konsa element dekhana hai
        //abh iss route ko use krna hai toh then goto App.jsx