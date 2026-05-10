import { useState } from "react"
import { supabase } from "../lib/supabase"

function AdminLogin({ setPage, showToast }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

const handleLogin = async () => {
  if (loading) return

  if (!username || !password) {
    showToast("Isi semua field", "error")
    return
  }

  setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  })

  if (error) {
    showToast("Login gagal", "error")
    setLoading(false)
    return
  }

  // 🔥 simpan user
  localStorage.setItem("admin_user", data.user.email)

  showToast("Login berhasil")
  setPage("admin")
}

  return (
    <div className="login-container">

      <div className="login-box">

        <h2 className="login-title">Admin Login</h2>

        <input
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={() => setPage("home")}
          className="login-back"
        >
          Kembali
        </button>

      </div>

    </div>
  )
}

export default AdminLogin