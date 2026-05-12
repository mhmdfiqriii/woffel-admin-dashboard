import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldAlert,
  Link2
} from "lucide-react"

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

    <main className="auth-page">

      {/* AMBIENT */}
      <div className="ambient ambient-1"></div>
      <div className="ambient ambient-2"></div>
      <div className="ambient ambient-3"></div>

      {/* LOGIN */}
      <motion.div
        initial={{
          opacity:0,
          y:20
        }}
        animate={{
          opacity:1,
          y:0
        }}
        transition={{
          duration:.45
        }}
        className="login-wrapper"
      >

        <div className="logo-box">
        <Link2 size={34} />
      </div>

        <h1 className="hero-title">
          Woffel Hub
        </h1>

        <p className="hero-subtitle">
          Centralized order analytics
          & management
        </p>

        <div className="glass-card">

          <p className="signin-text">
            Sign in to continue
          </p>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="admin@email.com"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {error && (
            <div className="error-text">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="signin-btn"
          >
            {loading
              ? "Loading..."
              : "Sign in →"}
          </button>

        </div>

        <p className="footer-note">
          Private admin access only · Woffel Store
        </p>

      </motion.div>

      {/* GATE */}
      <AnimatePresence>

        {showGate && (

          <motion.div
            initial={{
              opacity:0
            }}
            animate={{
              opacity:1
            }}
            exit={{
              opacity:0
            }}
            className="gate-overlay"
          >

            <motion.div
              initial={{
                opacity:0,
                scale:.95,
                y:20
              }}
              animate={{
                opacity:1,
                scale:1,
                y:0
              }}
              exit={{
                opacity:0,
                scale:.95
              }}
              transition={{
                duration:.25
              }}
              className="gate-modal"
            >

              <div className="gate-warning-icon">

                <ShieldAlert size={34} />

              </div>

              <h2>
                Akses Terbatas
              </h2>

             <p>
               <span className="warning-text">
                 ⚠️ Peringatan: Halaman ini hanya
                 untuk akses Administrator.
               </span>

               <br /><br />

               Jika kamu bukan admin Woffel,
               silahkan beralih ke web store.
            </p>

              <button
                className="continue-btn"
                onClick={() =>
                  setShowGate(false)
                }
              >
                🔑 Lanjutkan sebagai Admin
              </button>

              <button
                className="customer-btn"
                onClick={() =>
                  window.open(
                    "https://woffelstore.netlify.app/",
                    "_blank"
                  )
                }
              >
                🛒 Buka Woffel Store
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  )
}

export default AdminLogin