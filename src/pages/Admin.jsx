import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"

function Admin({ setPage, showToast }) {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("pending")
  const [typeFilter, setTypeFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [highlightId, setHighlightId] = useState(null)
  const [soundOn, setSoundOn] = useState(true)

  const topRef = useRef(null)
  const totalPending = orders.filter(o => o.status === "pending").length
  const totalProses = orders.filter(o => o.status === "proses").length
  const totalSelesai = orders.filter(o => o.status === "selesai").length

  const adminUser = localStorage.getItem("admin_user")

  const displayName = adminUser?.split("@")[0]

  useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      setPage("admin-login")
    }
  }

  checkUser()
}, [])

  const role = localStorage.getItem("role")

  // Export to csv/excel
  const exportCSV = () => {
  if (orders.length === 0) {
    showToast("Tidak ada data", "error")
    return
  }

  const headers = [
    "Order ID",
    "Type",
    "Status",
    "Customer",
    "Outlet",
    "Phone",
    "Variant",
    "Price",
    "Created At"
  ]

const safe = (val) => `"${String(val).replace(/"/g, '""')}"`

const rows = filteredOrders.map(o => [
  safe(o.order_id),
  safe(o.type),
  safe(o.status),
  safe(o.customer_name || "-"),
  safe(o.outlet || "-"),
  safe(o.phone || "-"),
  safe(o.variant),
  safe(o.price),
  safe(new Date(o.created_at).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta"
  }))
])

  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.join(","))
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `orders-${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

  // 🔥 NEW
  const [selectedOrder, setSelectedOrder] = useState(null)

  // TIMER ORDER
  const getTimeAgo = (date) => {
  const now = new Date()
  const created = new Date(date)

  const diff = Math.floor((now - created) / 1000) // detik

  if (diff < 60) return `${diff} detik lalu`
  
  const minutes = Math.floor(diff / 60)
  if (minutes < 60) return `${minutes} menit lalu`

  const hours = Math.floor(minutes / 60)
  return `${hours} jam lalu`
  }

  const getTimeColor = (date) => {
  const now = new Date()
  const created = new Date(date)

  const minutes = Math.floor((now - created) / 60000)

  if (minutes >= 15) return "#cf1322" // merah tua (bahaya)
  if (minutes >= 10) return "#ff4d4f" // merah
  if (minutes >= 5) return "#faad14" // kuning
  return "#666" // normal
  }

  const [, setTick] = useState(0)

useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
      setPage("admin-login")
    } else {
      localStorage.setItem("admin_user", data.session.user.email)
    }
  }

  checkUser()
}, [])

  useEffect(() => {
  const interval = setInterval(() => {
    setTick(t => t + 1)
  }, 60000) // tiap 1 menit

  return () => clearInterval(interval)
  }, [])

  // 🔥 sebelum return
  let items = []

  if (selectedOrder) {
  try {
    // 🟢 coba parse JSON (data baru)
    const parsed = JSON.parse(selectedOrder.variant)

    if (Array.isArray(parsed)) {
      items = parsed
    } else {
      items = []
    }

  } catch {
    // 🔴 fallback buat data lama (string ||)
    if (selectedOrder.variant?.includes("||")) {
      items = selectedOrder.variant.split("||").map(v => ({
        name: v,
        qty: "",
        options: ""
      }))
    } else {
      items = []
    }
  }
}

  const lastNotifyTime = useRef(0)
  const lastOrderId = useRef(null)
  const channelRef = useRef(null)
  const audioRef = useRef(null)
  const prosesAudioRef = useRef(null)
  const doneAudioRef = useRef(null)

  useEffect(() => {
  audioRef.current = new Audio("/notif.mp3")
  prosesAudioRef.current = new Audio("/pending.mp3")
  doneAudioRef.current = new Audio("/done.mp3")
  }, [])

  useEffect(() => {
  const saved = localStorage.getItem("sound")
  if (saved !== null) {
    setSoundOn(saved === "true")
  }
  }, [])

  useEffect(() => {
  localStorage.setItem("sound", soundOn)
  }, [soundOn])

  const cleanStatus = (status) => {
    return status?.replace(/'/g, "").trim().toLowerCase()
  }

// NOTIF
const notify = (id) => {
  const now = Date.now()

  if (now - lastNotifyTime.current < 1000) return

  if (id !== lastOrderId.current) {

    // 🔊 SOUND
    if (soundOn && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    setTimeout(() => {
      showToast("Order baru masuk 🚨")
    }, 200)

    lastOrderId.current = id
    lastNotifyTime.current = now
  }
}

// UPDATE STATUS + TRACK USERD
const updateStatus = async (id, status) => {
  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_by: adminUser,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error) console.log(error)

  // 🔊 SOUND
  if (soundOn) {
    if (status === "proses") {
      prosesAudioRef.current?.play().catch(() => {})
    }
    if (status === "selesai") {
      doneAudioRef.current?.play().catch(() => {})
    }
  }

  setSelectedOrder(prev =>
    prev ? { ...prev, status } : null
  )
}

  const getStatusColor = (status) => {
    if (status === "pending") return "#ff4d4f"
    if (status === "proses") return "#faad14"
    return "#389e0d"
  }

  const formatStatus = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1)
  }

  const formatRupiah = (angka) => new Intl.NumberFormat("id-ID").format(angka)

  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        setOrders(data.map(o => ({
          ...o,
          status: cleanStatus(o.status)
        }))
        .sort((a, b) => {
      const priority = { pending: 0, proses: 1, selesai: 2 }
      return priority[a.status] - priority[b.status]
        })
      )}
    }

    fetchOrders()

    const interval = setInterval(fetchOrders, 5000)

    const createChannel = () => {
  const channel = supabase
    .channel("orders-realtime")

    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "orders" },
      (payload) => {
        const data = payload.new
        if (!data) return

        data.status = cleanStatus(data.status)

        // 🔥 NOTIF LANGSUNG
        notify(data.id)

        setHighlightId(data.id)
        setTimeout(() => {
          topRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        setOrders(prev => {
          const exists = prev.find(o => o.id === data.id)

          if (exists) {
            return prev.map(o => o.id === data.id ? data : o)
          } else {
            return [data, ...prev]
          }
        })
      })
        .subscribe((status) => {
          if (status === "TIMED_OUT") {
            showToast("Trying Reconnect To Database...", "error")
            setTimeout(createChannel, 3000)
          }
        })

      channelRef.current = channel
    }

    createChannel()

    return () => {
      clearInterval(interval)
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    const filteredOrders = orders.filter(order => {
    const matchFilter = filter === "all" || order.status === filter
    const matchType = typeFilter === "all" || order.type === typeFilter

    const matchSearch =
      order.order_id?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase())

    return matchFilter && matchType && matchSearch
  })

  const totalOmzet = filteredOrders.reduce((acc, o) => acc + o.price, 0)
  

  return (
    <div style={{
      padding: 20,
      maxWidth: 600,
      margin: "auto",
      background: "#fafafa",
      minHeight: "100vh"
    }}>

      <h1 style={{ textAlign: "center", margin: 0 }}>Admin Panel</h1>
      <p style={{
  textAlign: "center",
  fontSize: 13,
  color: "#666",
  margin: "auto"
}}>
  Selamat datang👋 <b>{displayName}</b>
</p>

<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
}}>

  {/* SOUND */}
  <button
    onClick={() => setSoundOn(prev => !prev)}
    style={{
      padding: "6px 12px",
      borderRadius: 999,
      border: "1px solid #ddd",
      background: soundOn ? "#111" : "#fff",
      color: soundOn ? "#fff" : "#333",
      fontSize: 12
    }}
  >
    {soundOn ? "🔊 ON" : "🔇 OFF"}
  </button>

  {/* LOGOUT */}
  <button
    onClick={async () => {
      await supabase.auth.signOut()
      localStorage.removeItem("admin_user")
      setPage("home")
    }}
    style={{
      padding: "6px 12px",
      borderRadius: 999,
      border: "none",
      background: "#fff",
      fontSize: 12
    }}
  >
    Logout
  </button>

</div>

      <div ref={topRef}></div>

      {/* FILTER */}
      <input
        placeholder="Cari ID/Kode Order."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 10,
          border: "1px solid #ddd",
          marginBottom: 10
        }}
      />

      {/* FILTER BUTTON */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
{["all", "pending", "proses", "selesai"].map(f => {
  const count =
    f === "all"
      ? orders.length
      : orders.filter(o => o.status === f).length

  return (
    <button key={f}
      onClick={() => setFilter(f)}
      style={{
        flex: 1,
        padding: 8,
        borderRadius: 8,
        border: "1px solid #ddd",
        background: filter === f ? "#111" : "#fff",
        color: filter === f ? "#fff" : "#333",
        fontSize: 12,
        display: "flex",
        justifyContent: "center",
        gap: 4
      }}
    >
      {formatStatus(f)} ({count})
    </button>
  )
})}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      {["all", "fnb", "internet", "imei"].map(t => (
      <button key={t}
      onClick={() => setTypeFilter(t)}
      style={{
        flex: 1,
        padding: 8,
        borderRadius: 8,
        border: "1px solid #ddd",
        background: typeFilter === t ? "#111" : "#fff",
        color: typeFilter === t ? "#fff" : "#333"
      }}>
      {t.toUpperCase()}
      </button>
      ))}
      </div>

      {/* DASHBOARD MINI */}
<div style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 15
}}>

  <div className="dash-card">
    <div className="dash-label">Pending</div>
    <div className="dash-value">{totalPending}</div>
  </div>

  <div className="dash-card">
    <div className="dash-label">Proses</div>
    <div className="dash-value">{totalProses}</div>
  </div>

  <div className="dash-card">
    <div className="dash-label">Selesai</div>
    <div className="dash-value">{totalSelesai}</div>
  </div>

  <div className="dash-card">
    <div className="dash-label">Omzet</div>
    <div className="dash-value">
      Rp {formatRupiah(totalOmzet)}
    </div>
  </div>

</div>

{role === "admin" && (
<button
  onClick={exportCSV}
  style={{
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    width: "100%"
  }}
>
  Export CSV
</button>
)}

      {/* CARD */}
{filteredOrders.map(order => (
  <div
    key={order.id}
    onClick={() => setSelectedOrder(order)}
    style={{
      cursor: "pointer",
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      background: "#fff",
      borderLeft: `6px solid ${getStatusColor(order.status)}`,
      boxShadow: highlightId === order.id
        ? "0 0 0 2px #1677ff"
        : "0 2px 6px rgba(0,0,0,0.05)",
      opacity: order.status === "selesai" ? 0.6 : 1
    }}
  >

    {/* TOP */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span style={{ fontSize: 12, color: "#666" }}>
        {order.type.toUpperCase()}
      </span>

      <span style={{
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 999,
        background: getStatusColor(order.status),
        color: "#fff"
      }}>
        {formatStatus(order.status)}
      </span>
    </div>

    {/* ID */}
    <div style={{
      fontSize: 18,
      fontWeight: 700,
      margin: "6px 0"
    }}>
      {order.order_id}
      <div style={{
  fontSize: 12,
  color: getTimeColor(order.created_at),
  marginBottom: 6
}}>
  ⏱️ {getTimeAgo(order.created_at)}
</div>
    </div>

    {/* BOTTOM */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span style={{ fontWeight: 600 }}>
        Rp {formatRupiah(order.price)}
      </span>

      {/* 🔥 QUICK ACTION */}
      <div style={{ display: "flex", gap: 6 }}>
        
        {/* PROSES */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            updateStatus(order.id, "proses")
          }}
          disabled={order.status !== "pending"}
          style={{
            fontSize: 10,
            padding: "4px 8px",
            borderRadius: 6,
            border: "none",
            background: order.status === "pending" ? "#faad14" : "#ddd",
            color: "#fff"
          }}
        >
          P
        </button>

        {/* SELESAI */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            updateStatus(order.id, "selesai")
          }}
          disabled={order.status === "selesai"}
          style={{
            fontSize: 10,
            padding: "4px 8px",
            borderRadius: 6,
            border: "none",
            background: order.status !== "selesai" ? "#389e0d" : "#ddd",
            color: "#fff"
          }}
        >
          D
        </button>

      </div>
    </div>

  </div>
))}

      {/* 🔥 MODAL */}
{selectedOrder && (
  <div
    className="admin-modal-overlay"
    onClick={() => setSelectedOrder(null)}
  >
    <div
      className="admin-modal-box"
      onClick={e => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-id">
          {selectedOrder.order_id}
        </div>

        <div
          className="admin-status"
          style={{ background: getStatusColor(selectedOrder.status) }}
        >
          {formatStatus(selectedOrder.status)}
        </div>
      </div>

{selectedOrder.updated_by && (
  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
    Diupdate oleh: {selectedOrder.updated_by}
  </div>
)}

{selectedOrder.updated_at && (
  <div style={{ fontSize: 12, color: "#666" }}>
    Waktu: {new Date(selectedOrder.updated_at)
      .toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
  </div>
)}

      <div className="admin-sub">
        {selectedOrder.type.toUpperCase()} •{" "}
        {new Date(selectedOrder.created_at)
          .toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
      </div>

      {/* DATA */}
{selectedOrder.type === "fnb" && (
  <div className="admin-section">
    <div className="admin-label">Data Pembeli</div>

    <div>Nama Pemesan : {selectedOrder.customer_name}</div>
    <div>Outlet : {selectedOrder.outlet}</div>
    <div>Jam Pengambilan : {selectedOrder.pickup_time}</div>
  </div>
)}

      {selectedOrder.type === "internet" && (
        <div className="admin-section">
          <div className="admin-label">Data Pembeli</div>
          <div>No. HP : {selectedOrder.phone}</div>
        </div>
      )}

      {/* PESANAN */}
      <div className="admin-section">
        <div className="admin-label">Pesanan</div>

        {/* FNB */}
        {selectedOrder.type === "fnb" && items.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div>
              {i + 1}. {item.name} ({item.qty}x)
            </div>

            {item.options && (
              <div style={{ fontSize: 12, color: "#666" }}>
                {item.options}
              </div>
            )}
          </div>
        ))}

        {/* DIGITAL */}
        {selectedOrder.type !== "fnb" && (
          <div>Varian : {selectedOrder.variant}
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="admin-total">
        <div className="admin-label">Total</div>
        <div className="admin-total-price">
          Rp {formatRupiah(selectedOrder.price)}
        </div>
      </div>

      {/* ACTION */}
      <div className="admin-actions">
<button
  className={`admin-btn ${
    selectedOrder.status !== "pending"
      ? "btn-disabled"
      : "btn-proses"
  }`}
  disabled={selectedOrder.status !== "pending"}
  onClick={() => updateStatus(selectedOrder.id, "proses")}
>
  Proses
</button>

<button
  className={`admin-btn ${
    selectedOrder.status === "selesai"
      ? "btn-disabled"
      : "btn-selesai"
  }`}
  disabled={selectedOrder.status === "selesai"}
  onClick={() => updateStatus(selectedOrder.id, "selesai")}
>
  Selesai
</button>
      </div>

      <button
        className="btn-close"
        onClick={() => setSelectedOrder(null)}
      >
        Tutup
      </button>

    </div>
  </div>
)}

    </div>
  )
}

export default Admin