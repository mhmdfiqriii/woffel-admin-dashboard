function DashboardStats({
  totalPending,
  totalProses,
  totalSelesai,
  totalOmzet,
  formatRupiah
}) {

  return (

    <div className="admin-stats">

      <div className="admin-card">

        <div className="admin-card-label">
          Pending
        </div>

        <div className="admin-card-value">
          {totalPending}
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-label">
          Proses
        </div>

        <div className="admin-card-value">
          {totalProses}
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-label">
          Selesai
        </div>

        <div className="admin-card-value">
          {totalSelesai}
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-label">
          Omzet
        </div>

        <div className="admin-card-value">
          Rp {formatRupiah(totalOmzet)}
        </div>

      </div>

    </div>

  )

}

export default DashboardStats