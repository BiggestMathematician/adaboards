import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { AppNavbar } from './components/AppNavbar'
import { BoardPage } from './pages/BoardPage'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = window.localStorage.getItem('adaboards-theme')
    return storedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('adaboards-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppNavbar theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boards/:boardId"
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
