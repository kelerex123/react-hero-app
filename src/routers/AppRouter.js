import React from 'react'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { LoginScreen } from '../components/login/LoginScreen'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const {user} =useContext(AuthContext);

    return (
        <BrowserRouter>


            <Routes>
                <Route path='/login' element={
                    <PublicRoute isAuthenticated={user.logged}>
                        <LoginScreen />
                    </PublicRoute>
                }/>
                <Route path='/*' element={
                    <PrivateRoute isAuthenticated={user.logged}>
                        <DashboardRoutes />
                    </PrivateRoute>
                }/>
            </Routes>
      </BrowserRouter>
    )
}
