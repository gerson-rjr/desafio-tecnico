import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student"
import Teacher from "../pages/Teacher"
import NotFound from "../pages/NotFound";
import ProofCorrection from "../pages/ProofCorrection";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/student',
        element: <Student/>,
    },
    {
        path: '/teacher',
        element: <Teacher/>,
    },
    {
        path: '/proof-correction',
        element: <ProofCorrection/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
])