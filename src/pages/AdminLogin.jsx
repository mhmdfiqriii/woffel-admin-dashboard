import { useState } from "react"
import { ShieldCheck, ShieldAlert } from "lucide-react"
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

  const [showGate, setShowGate] =
    useState(true)

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

      {/* BACKGROUND */}
      <div className="gate-ambient gate-ambient-1"></div>
      <div className="gate-ambient gate-ambient-2"></div>
      <div className="gate-grid"></div>

      {/* LOGIN */}
      <div className="login-box">

        <div className="gate-icon">
          <ShieldCheck size={34} />
        </div>

        <h1 className="login-title">
          WOFFEL Dashboard
        </h1>

        <p className="login-subtitle">
          Private admin access only
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

      {/* WARNING OVERLAY */}
      {showGate && (
        <div className="gate-overlay">

          <div className="gate-warning-box">

            <div className="gate-warning-icon">
              <ShieldAlert size={34} />
            </div>

            <h2 className="gate-warning-title">
              Akses Terbatas
            </h2>

            <p className="gate-warning-text">
              Halaman ini hanya untuk administrator WOFFEL Dashboard.
            </p>

            <button
              className="gate-warning-btn"
              onClick={() => setShowGate(false)}
            >
              🔑 Lanjutkan sebagai Admin
            </button>

            <button
              className="gate-customer-btn"
              onClick={() =>
                window.open(
                  "https://woffelstore.netlify.app/",
                  "_blank"
                )
              }
            >
              Buka Web App Customer
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default AdminLogin