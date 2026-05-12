import {
  useEffect,
  useState,
  useRef,
  useCallback
} from "react"

import { useNavigate } from "react-router-dom"

import { supabase } from "../lib/supabase"

import "../components/admin/admin.css"

import DashboardHeader from "../components/admin/DashboardHeader"
import FilterBar from "../components/admin/FilterBar"
import DashboardStats from "../components/admin/DashboardStats"
import OrderCard from "../components/admin/OrderCard"
import OrderModal from "../components/admin/OrderModal"

import {
  formatRupiah,
  formatStatus,
  cleanStatus,
  getStatusColor,
  getTimeAgo,
  getTimeColor,
  exportOrdersCSV
} from "../components/admin/adminUtils"

function Admin() {

  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("pending")
  const [search, setSearch] = useState("")
  const [highlightId, setHighlightId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const [soundOn, setSoundOn] = useState(() => {

    const saved =
      localStorage.getItem("sound")

    return saved !== null
      ? saved === "true"
      : true

  })

  const [, setTick] = useState(0)

  const topRef = useRef(null)

  const navigate = useNavigate()

  const lastNotifyTime = useRef(0)
  const lastOrderId = useRef(null)
  const channelRef = useRef(null)

  const audioRef = useRef(null)
  const prosesAudioRef = useRef(null)
  const doneAudioRef = useRef(null)

  const adminUser =
    localStorage.getItem("admin_user")

  const displayName =
    adminUser?.split("@")[0]

  const role =
    localStorage.getItem("role")

  const totalPending =
    orders.filter(o =>
      o.status === "pending"
    ).length

  const totalProses =
    orders.filter(o =>
      o.status === "proses"
    ).length

  const totalSelesai =
    orders.filter(o =>
      o.status === "selesai"
    ).length

  const notify = useCallback((id) => {

    const now = Date.now()

    if (
      now - lastNotifyTime.current < 1000
    ) return

    if (id !== lastOrderId.current) {

      if (
        soundOn &&
        audioRef.current
      ) {

        audioRef.current.currentTime = 0

        audioRef.current.play()
          .catch(() => {})

      }

      setTimeout(() => {
        alert("Order baru masuk 🚨")
      }, 200)

      lastOrderId.current = id
      lastNotifyTime.current = now

    }

  }, [soundOn])

  const updateStatus = async (
    id,
    status
  ) => {

    const { error } =
      await supabase
        .from("orders")
        .update({
          status,
          updated_by: adminUser,
          updated_at:
            new Date().toISOString()
        })
        .eq("id", id)

    if (error)
      console.log(error)

    if (soundOn) {

      if (status === "proses") {

        prosesAudioRef.current
          ?.play()
          .catch(() => {})

      }

      if (status === "selesai") {

        doneAudioRef.current
          ?.play()
          .catch(() => {})

      }

    }

    setSelectedOrder(prev =>
      prev
        ? { ...prev, status }
        : null
    )

  }

  const filteredOrders =
    orders.filter(order => {

      const matchFilter =
        filter === "all" ||
        order.status === filter

      const matchSearch =

        order.order_id
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        order.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      return (
        matchFilter &&
        matchSearch
      )

    })

  const totalOmzet =
    filteredOrders.reduce(
      (acc, o) =>
        acc + o.price,
      0
    )

  const exportCSV = () => {

    exportOrdersCSV(
      orders,
      filteredOrders
    )

  }

  useEffect(() => {

    const checkUser = async () => {

      const { data } =
        await supabase.auth.getSession()

      if (!data.session) {

        navigate("/login")

      } else {

        localStorage.setItem(
          "admin_user",
          data.session.user.email
        )

      }

    }

    checkUser()

  }, [navigate])

  useEffect(() => {

    audioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-notif.mp3"
      )

    prosesAudioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-pending.mp3"
      )

    doneAudioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-done.mp3"
      )

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "sound",
      soundOn
    )

  }, [soundOn])

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTick(t => t + 1)

      }, 60000)

    return () =>
      clearInterval(interval)

  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    const fetchOrders = async () => {

      const { data } =
        await supabase
          .from("orders")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false
            }
          )

      if (data) {

        setOrders(
          data
            .map(o => ({
              ...o,
              status:
                cleanStatus(o.status)
            }))
            .sort((a, b) => {

              const priority = {
                pending: 0,
                proses: 1,
                selesai: 2
              }

              return (
                priority[a.status] -
                priority[b.status]
              )

            })
        )

      }

    }

    fetchOrders()

    const interval =
      setInterval(
        fetchOrders,
        5000
      )

    const createChannel = () => {

      const channel =
        supabase
          .channel("orders-realtime")

          .on(
            "postgres_changes",

            {
              event: "INSERT",
              schema: "public",
              table: "orders"
            },

            (payload) => {

              const data =
                payload.new

              if (!data) return

              data.status =
                cleanStatus(data.status)

              notify(data.id)

              setHighlightId(data.id)

              setTimeout(() => {

                topRef.current
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })

              }, 100)

              setOrders(prev => {

                const exists =
                  prev.find(
                    o =>
                      o.id === data.id
                  )

                if (exists) {

                  return prev.map(o =>
                    o.id === data.id
                      ? data
                      : o
                  )

                }

                return [data, ...prev]

              })

            }
          )

          .subscribe((status) => {

            if (
              status === "TIMED_OUT"
            ) {

              alert(
                "Trying Reconnect To Database..."
              )

              setTimeout(
                createChannel,
                3000
              )

            }

          })

      channelRef.current =
        channel

    }

    createChannel()

    return () => {

      clearInterval(interval)

      if (channelRef.current) {

        supabase.removeChannel(
          channelRef.current
        )

      }

    }

  }, [])

  return (

    <div className="admin-page">

      <div className="admin-container">

        <div ref={topRef}></div>

        <DashboardHeader
          displayName={displayName}
          soundOn={soundOn}
          setSoundOn={setSoundOn}
          exportCSV={exportCSV}
          navigate={navigate}
          role={role}
        />

        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          orders={orders}
          formatStatus={formatStatus}
        />

        <DashboardStats
          totalPending={totalPending}
          totalProses={totalProses}
          totalSelesai={totalSelesai}
          totalOmzet={totalOmzet}
          formatRupiah={formatRupiah}
        />

        {filteredOrders.map(order => (

          <OrderCard
            key={order.id}
            order={order}
            highlightId={highlightId}
            setSelectedOrder={setSelectedOrder}
            updateStatus={updateStatus}
            getStatusColor={getStatusColor}
            formatStatus={formatStatus}
            formatRupiah={formatRupiah}
            getTimeAgo={getTimeAgo}
            getTimeColor={getTimeColor}
          />

        ))}

        <OrderModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          updateStatus={updateStatus}
          getStatusColor={getStatusColor}
          formatStatus={formatStatus}
          formatRupiah={formatRupiah}
        />

      </div>

    </div>

  )

}

export default Admin