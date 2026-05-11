import { ShieldAlert, LockKeyhole } from "lucide-react"
import { useNavigate } from "react-router-dom"

function AdminGate() {

  const navigate = useNavigate()

  return (
    <div className="gate-page">

      {/* AMBIENT */}
      <div className="gate-ambient gate-ambient-1"></div>
      <div className="gate-ambient gate-ambient-2"></div>
      <div className="gate-grid"></div>

      <div className="gate-container">

        <div className="gate-icon">
          <ShieldAlert size={34} />
        </div>

        <h1 className="gate-title">
          Akses Terbatas
        </h1>

        <p className="gate-desc">
          Halaman ini hanya untuk akses administrator Woffel Dashboard.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="gate-btn-primary"
        >
          <LockKeyhole size={18} />
          Lanjutkan sebagai Admin
        </button>

        <button
          onClick={() =>
            window.open(
              "https://woffelstore.netlify.app/",
              "_blank"
            )
          }
          className="gate-btn-secondary"
        >
          Buka Web App Customer
        </button>

      </div>

    </div>
  )
}

export default AdminGate