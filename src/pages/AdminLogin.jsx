import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { supabase } from "../lib/supabase"

function AdminLogin() {

  const navigate = useNavigate()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleLogin = async () => {

    if (loading) return

    if (!username || !password) {
      setError("Isi semua field")
      return
    }

    setLoading(true)
    setError("")

    const { error } =
      await supabase.auth.signInWithPassword({
        email: username,
        password
      })

    if (error) {
      setError("Login gagal")
      setLoading(false)
      return
    }

    navigate("/")

  }

  return (
    <div className="login-page">

      <div className="login-box">

        <h1 className="login-title">
          WOFFEL Dashboard
        </h1>

        <p className="login-subtitle">
          Admin access only
        </p>

        <input
          placeholder="Email"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="login-input"
        />

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-btn"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

      </div>

    </div>
  )
}

export default AdminLogin