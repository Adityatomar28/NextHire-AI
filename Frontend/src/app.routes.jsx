import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import InterviewDashboard from "./features/interview/components/InterviewDashboard";

const NotFound = () => (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
            <h1>404 - Page not found</h1>
            <p>Sorry, we could not locate that page.</p>
            <a href="/" style={{ color: '#6a82fb', textDecoration: 'underline' }}>Return home</a>
        </div>
    </main>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Navigate to="/" replace />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/login",
        element: <Navigate to="/" replace />
    },
    {
        path:"/interview/report/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path:"/interview/dashboard/:interviewId",
        element: <Protected><InterviewDashboard /></Protected>
    },
    {
        path: "*",
        element: <NotFound />
    }
])