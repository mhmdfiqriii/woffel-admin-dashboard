function AdminToast({
  toast
}) {

  if (!toast) return null

  const toastTitles = {

    success:
      "Berhasil",

    error:
      "Error",

    warning:
      "Peringatan",

    info:
      "Informasi",

    "new-order":
      "Order Baru",

    proses:
      "Order Diproses",

    selesai:
      "Order Selesai",

    reconnect:
      "Reconnect",

    offline:
      "Realtime Offline"

  }

  const toastIcons = {

    success: "✓",

    error: "✕",

    warning: "!",

    info: "•",

    "new-order": "🛎",

    proses: "⚡",

    selesai: "✔",

    reconnect: "↻",

    offline: "✕"

  }

  const title =
    toast.title ||
    toastTitles[toast.type] ||
    "Notifikasi"

  const icon =
    toast.icon ||
    toastIcons[toast.type] ||
    "•"

  return (

    <div className="admin-toast-wrap">

      <div
        className={`
          admin-toast
          admin-toast-${toast.type}
        `}
      >

        <div className="admin-toast-glow"></div>

        <div className="admin-toast-icon">
          {icon}
        </div>

        <div className="admin-toast-text">

          <div className="admin-toast-title">
            {title}
          </div>

          <div className="admin-toast-message">
            {toast.message}
          </div>

        </div>

        <div
          className="
            admin-toast-progress
          "
        ></div>

      </div>

    </div>

  )

}

export default AdminToast