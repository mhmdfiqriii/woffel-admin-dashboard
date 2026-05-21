import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import {
  useEffect,
  useState
} from "react"

import {
  supabase
} from "./lib/supabase"

import AdminDashboard
from "./pages/AdminDashboard"

import ProductsPage
from "./pages/ProductsPage"

import ReviewsPage
from "./pages/ReviewsPage"

import StorePage
from "./pages/StorePage"

import SettingsPage
from "./pages/SettingsPage"

import AdminLogin
from "./pages/AdminLogin"

import ProtectedRoute
from "./components/ProtectedRoute"

import AnalyticsPage
from "./pages/AnalyticsPage"

function App() {

  const [session, setSession] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    supabase.auth
      .getSession()

      .then(({ data }) => {

        setSession(
          data.session
        )

        setLoading(false)

      })

    const {
      data: listener
    } =

      supabase.auth
        .onAuthStateChange(
          (_, session) => {

            setSession(session)

          }
        )

    return () => {

      listener.subscription
        .unsubscribe()

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

              ? (
                  <Navigate
                    to="/admin/dashboard"
                    replace
                  />
                )

              : (
                  <AdminLogin />
                )

          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              session={session}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              session={session}
            >
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute
              session={session}
            >
              <ReviewsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/store"
          element={
            <ProtectedRoute
              session={session}
            >
              <StorePage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/analytics"
  element={
    <ProtectedRoute
      session={session}
    >
      <AnalyticsPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute
              session={session}
            >
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App