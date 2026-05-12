import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

function DashboardHeader({
  displayName,
  soundOn,
  setSoundOn,
  exportCSV,
  navigate,
  role
}) {

  const [time, setTime] =
    useState("")

  useEffect(() => {

    const updateClock = () => {

      const now =
        new Date()

      setTime(
        now.toLocaleTimeString(
          "id-ID",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )
      )

    }

    updateClock()

    const interval =
      setInterval(
        updateClock,
        1000
      )

    return () =>
      clearInterval(interval)

  }, [])

  const handleLogout = async () => {

    await supabase.auth.signOut()

    localStorage.removeItem(
      "admin_user"
    )

    navigate("/login")

  }

  return (

    <div className="admin-header">

      <div className="admin-header-top">

        <div className="admin-header-brand">

          <div className="admin-header-dot"></div>

          <div>

            <div className="admin-header-label">
              WOFFEL ADMIN
            </div>

            <h1 className="admin-header-title">
              Dashboard
            </h1>

          </div>

        </div>

        <div className="admin-header-clock">
          {time}
        </div>

      </div>

      <div className="admin-header-divider"></div>

      <div className="admin-header-info">

        <div>

          <div className="admin-header-subtitle">
            Selamat datang kembali
          </div>

          <div className="admin-header-user">
            {displayName}
          </div>

        </div>

      </div>

      <div className="admin-header-actions">

        <button
          onClick={() =>
            setSoundOn(prev => !prev)
          }
          className={`admin-btn ${
            soundOn
              ? "admin-btn-active"
              : ""
          }`}
        >
          <span>
            {soundOn ? "🔊" : "🔇"}
          </span>

          <span>
            {soundOn
              ? "Sound On"
              : "Muted"}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="admin-btn"
        >
          <span>↗</span>
          <span>Logout</span>
        </button>

      </div>

      {role === "admin" && (

        <button
          onClick={exportCSV}
          className="
            admin-btn
            admin-btn-export
          "
        >
          ⭳ Export CSV
        </button>

      )}

    </div>

  )

}

export default DashboardHeader