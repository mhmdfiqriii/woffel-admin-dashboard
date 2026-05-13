function AdminToast({
  toast
}) {

  if (!toast) return null

  return (

    <div
      className={`
        admin-toast
        admin-toast-${toast.type}
      `}
    >

      <div className="admin-toast-glow"></div>

      <div className="admin-toast-content">

        <div className="admin-toast-icon">

          {toast.type === "success" && "✓"}

          {toast.type === "error" && "✕"}

          {toast.type === "warning" && "!"}

          {toast.type === "new-order" && "🛎"}

          {toast.type === "proses" && "⚡"}

          {toast.type === "selesai" && "✔"}

          {![
            "success",
            "error",
            "warning",
            "new-order",
            "proses",
            "selesai"
          ].includes(toast.type) && "•"}

        </div>

        <div className="admin-toast-text">

          <div className="admin-toast-title">

            {toast.type === "new-order" &&
              "Order Baru"}

            {toast.type === "success" &&
              "Berhasil"}

            {toast.type === "error" &&
              "Error"}

            {toast.type === "warning" &&
              "Peringatan"}

            {toast.type === "proses" &&
              "Order Diproses"}

            {toast.type === "selesai" &&
              "Order Selesai"}

          </div>

          <div className="admin-toast-message">
            {toast.message}
          </div>

        </div>

      </div>

      <div
        className="admin-toast-progress"
      ></div>

    </div>

  )

}

export default AdminToast