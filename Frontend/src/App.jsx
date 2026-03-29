import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import SVGGradients from "./features/interview/components/SVGGradients"
import "./style/globals.scss"

function App() {
  return (
    <>
      <SVGGradients />
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App