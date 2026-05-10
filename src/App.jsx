import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import { useEffect, useState } from "react"

import { supabase } from "./lib/supabase"

import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  const [session, setSession] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    supabase.auth.getSession()
      .then(({ data }) => {

        setSession(data.session)
        setLoading(false)

      })

    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  if (loading) {
    return null
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            session
              ? <Navigate to="/" replace />
              : <AdminLogin />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute session={session}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App