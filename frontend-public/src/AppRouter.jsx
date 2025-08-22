import {lazy} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Layout from "./pages/Layout.jsx";

const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const CertificateVerify = lazy(() => import("./pages/CertificateVerify.jsx"));
const Course = lazy(() => import("./pages/CourseDetail.jsx"));

const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function AppRouter() {
    return (
        <Router basename={import.meta.env.VITE_APP_FRONTEND_PUBLIC_URL.includes('ngrok') ? 'public' : ''}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path={'course'} element={<Course/>}/>
                    <Route path={'certificates'} element={<CertificateVerify/>}/>
                    <Route path={'about'} element={<About/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}