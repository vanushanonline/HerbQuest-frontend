import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Auth from './pages/Auth'

const Router = () => {

    const PrivateRoutes = () => JSON.parse(sessionStorage.getItem('login')) ? < Outlet /> : <Navigate to="/" />

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/output" element={<Home />} />
                </Route>
                <Route index element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router