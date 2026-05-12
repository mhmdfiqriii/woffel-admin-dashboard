import { supabase } from "../../lib/supabase"

function DashboardHeader({
  displayName,
  soundOn,
  setSoundOn,
  exportCSV,
  navigate,
  role
}) {

  const handleLogout = async () => {

    await supabase.auth.signOut()

    localStorage.removeItem(
      "admin_user"
    )

    navigate("/login")

  }

  return (

    <div className="admin-header">

      <h1 className="admin-header-title">
        Woffel Dashboard
      </h1>

      <p className="admin-header-subtitle">
        Selamat datang👋
        {" "}
        <b>{displayName}</b>
      </p>

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
          {soundOn
            ? "🔊 ON"
            : "🔇 OFF"}
        </button>

        <button
          onClick={handleLogout}
          className="admin-btn"
        >
          Logout
        </button>

      </div>

      {role === "admin" && (

        <button
          onClick={exportCSV}
          className="admin-btn admin-btn-export"
        >
          Export CSV
        </button>

      )}

    </div>

  )

}

export default DashboardHeader