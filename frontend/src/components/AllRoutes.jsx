import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import { AddBook } from '../pages/AddBook'
import BookDetails from '../pages/BookDetails'
import ProtectedRoute from './ProtectedRoutes'
import Register from './Register'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/book/:id"
                element={
                    <ProtectedRoute>
                        <BookDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-book"
                element={
                    <ProtectedRoute adminOnly={true}>
                        <AddBook />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}
