import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react"

import {
  useNavigate
} from "react-router-dom"

import {
  supabase
} from "../lib/supabase"

import "../components/admin/admin.css"

import DashboardHeader
from "../components/admin/DashboardHeader"

import FilterBar
from "../components/admin/FilterBar"

import DashboardStats
from "../components/admin/DashboardStats"

import OrderCard
from "../components/admin/OrderCard"

import OrderModal
from "../components/admin/OrderModal"

import AdminToast
from "../components/admin/AdminToast"

import SkeletonOrder
from "../components/admin/SkeletonOrder"

import StoreToggleCard
from "../components/admin/StoreToggleCard"

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

  const [orders, setOrders] =
    useState([])

  const [filter, setFilter] =
    useState("pending")

  const [search, setSearch] =
    useState("")

  const [
    debouncedSearch,
    setDebouncedSearch
  ] = useState("")

  const [
    highlightId,
    setHighlightId
  ] = useState(null)

  const [
    selectedOrder,
    setSelectedOrder
  ] = useState(null)

  const [loading, setLoading] =
    useState(true)

  const [
    realtimeStatus,
    setRealtimeStatus
  ] = useState("connecting")

  const [toast, setToast] =
    useState(null)

  const [
    unreadCount,
    setUnreadCount
  ] = useState(0)

  const [
  currentTime,
  setCurrentTime
  ] = useState(() => Date.now())

  const [
    storeStatus,
    setStoreStatus
  ] = useState({
    kopken: true,
    fore: true,
    tomoro: true
  })

  const [soundOn, setSoundOn] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "sound"
        )

      return saved !== null
        ? saved === "true"
        : true

    })

  const topRef = useRef(null)

  const navigate =
    useNavigate()

  const lastNotifyTime =
    useRef(0)

  const lastOrderId =
    useRef(null)

  const channelRef =
    useRef(null)

  const reconnectTimeoutRef =
    useRef(null)

  const toastTimeoutRef =
    useRef(null)

  const audioRef =
    useRef(null)

  const prosesAudioRef =
    useRef(null)

  const doneAudioRef =
    useRef(null)

  const adminUser =
    localStorage.getItem(
      "admin_user"
    )

  const displayName =
    adminUser?.split("@")[0]

  const role =
    localStorage.getItem(
      "role"
    )

  const totalPending =
    orders.filter(
      o =>
        o.status ===
        "pending"
    ).length

  const totalProses =
    orders.filter(
      o =>
        o.status ===
        "proses"
    ).length

  const totalSelesai =
    orders.filter(
      o =>
        o.status ===
        "selesai"
    ).length

  const showToast =
    useCallback((
      message,
      type = "info"
    ) => {

      clearTimeout(
        toastTimeoutRef.current
      )

      setToast({
        id: Date.now(),
        message,
        type
      })

      toastTimeoutRef.current =
        setTimeout(() => {

          setToast(null)

        }, 3200)

    }, [])

  const notify =
    useCallback((id) => {

      const now =
        Date.now()

      if (
        now -
        lastNotifyTime.current <
        1000
      ) return

      if (
        id !==
        lastOrderId.current
      ) {

        if (
          soundOn &&
          audioRef.current
        ) {

          audioRef.current.currentTime =
            0

          audioRef.current
            .play()
            .catch(() => {})

        }

        showToast(
          "Order baru masuk 🚨",
          "new-order"
        )

        setUnreadCount(
          prev => prev + 1
        )

        lastOrderId.current =
          id

        lastNotifyTime.current =
          now

      }

    }, [
      soundOn,
      showToast
    ])

  const updateStatus =
    async (
      id,
      status
    ) => {

      const { error } =
        await supabase
          .from("orders")
          .update({
            status,
            updated_by:
              adminUser,
            updated_at:
              new Date()
                .toISOString()
          })
          .eq("id", id)

      if (error) {

        console.log(error)

        showToast(
          "Gagal update status",
          "error"
        )

        return

      }

      if (soundOn) {

        if (
          status ===
          "proses"
        ) {

          prosesAudioRef.current
            ?.play()
            .catch(() => {})

        }

        if (
          status ===
          "selesai"
        ) {

          doneAudioRef.current
            ?.play()
            .catch(() => {})

        }

      }

      showToast(
        `Order ${formatStatus(status)}`,
        status
      )

      setOrders(prev =>

        prev.map(order =>

          order.id === id

            ? {
                ...order,
                status
              }

            : order

        )

      )

      setSelectedOrder(prev =>

        prev

          ? {
              ...prev,
              status
            }

          : null

      )

    }

  const updateStoreStatus =
    async (
      storeName,
      isOpen
    ) => {

      const { error } =
        await supabase
          .from("store_status")
          .upsert({
            store_name:
              storeName,
            is_open:
              isOpen,
            updated_at:
              new Date()
                .toISOString()
          })

      if (error) {

        console.log(error)

        showToast(
          "Gagal update store",
          "error"
        )

        return

      }

      setStoreStatus(prev => ({
        ...prev,
        [storeName]:
          isOpen
      }))

      showToast(

        isOpen
          ? `${storeName} dibuka`
          : `${storeName} ditutup`,

        isOpen
          ? "success"
          : "warning"

      )

    }

  useEffect(() => {

    const debounce =
      setTimeout(() => {

        setDebouncedSearch(
          search
        )

      }, 350)

    return () =>
      clearTimeout(
        debounce
      )

  }, [search])

  useEffect(() => {

    localStorage.setItem(
      "sound",
      soundOn
    )

  }, [soundOn])

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentTime(
          Date.now()
        )

      }, 60000)

    return () =>
      clearInterval(
        interval
      )

  }, [])

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setHighlightId(null)

      }, 4500)

    return () =>
      clearTimeout(timeout)

  }, [highlightId])

  const filteredOrders =
    useMemo(() => {

      return orders.filter(
        order => {

          const matchFilter =

            filter === "all" ||

            order.status ===
            filter

          const keyword =
            debouncedSearch
              .toLowerCase()

          const matchSearch =

            order.order_id
              ?.toLowerCase()
              .includes(
                keyword
              )

            ||

            order.customer_name
              ?.toLowerCase()
              .includes(
                keyword
              )

          return (
            matchFilter &&
            matchSearch
          )

        }
      )

    }, [
      orders,
      filter,
      debouncedSearch
    ])

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

    const checkUser =
      async () => {

        const { data } =

          await supabase.auth
            .getSession()

        if (
          !data.session
        ) {

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

    const sortOrders =
      (data) => {

        return data

          .map(o => ({
            ...o,
            status:
              cleanStatus(
                o.status
              )
          }))

          .sort((a, b) => {

            const priority = {
              pending: 0,
              proses: 1,
              selesai: 2
            }

            return (
              priority[
                a.status
              ] -
              priority[
                b.status
              ]
            )

          })

      }

    const fetchOrders =
      async () => {

        const {
          data,
          error
        } =

          await supabase
            .from("orders")
            .select("*")
            .order(
              "created_at",
              {
                ascending:
                  false
              }
            )

        if (error) {

          console.log(error)

          setRealtimeStatus(
            "offline"
          )

          return

        }

        setOrders(
          sortOrders(data)
        )

        setLoading(false)

      }

    const fetchStoreStatus =
      async () => {

        const {
          data,
          error
        } =

          await supabase
            .from(
              "store_status"
            )
            .select("*")

        if (
          error ||
          !data
        ) return

        const mapped = {}

        data.forEach(item => {

          mapped[
            item.store_name
          ] = item.is_open

        })

        setStoreStatus(prev => ({
          ...prev,
          ...mapped
        }))

      }

    fetchOrders()

    fetchStoreStatus()

    const interval =
      setInterval(
        fetchOrders,
        5000
      )

    const createChannel =
      () => {

        setRealtimeStatus(
          "connecting"
        )

        const channel =

          supabase
            .channel(
              "orders-realtime"
            )

            .on(
              "postgres_changes",

              {
                event:
                  "INSERT",

                schema:
                  "public",

                table:
                  "orders"
              },

              payload => {

                const data =
                  payload.new

                if (!data)
                  return

                data.status =
                  cleanStatus(
                    data.status
                  )

                notify(data.id)

                setHighlightId(
                  data.id
                )

                setTimeout(() => {

                  topRef.current
                    ?.scrollIntoView({
                      behavior:
                        "smooth"
                    })

                }, 100)

                setOrders(prev => {

                  const exists =
                    prev.find(
                      o =>
                        o.id ===
                        data.id
                    )

                  if (
                    exists
                  ) {

                    return prev.map(
                      o =>

                        o.id ===
                        data.id

                          ? data

                          : o

                    )

                  }

                  return [
                    data,
                    ...prev
                  ]

                })

              }
            )

            .subscribe(
              status => {

                if (
                  status ===
                  "SUBSCRIBED"
                ) {

                  setRealtimeStatus(
                    "online"
                  )

                }

                if (
                  status ===
                  "CHANNEL_ERROR"
                ) {

                  setRealtimeStatus(
                    "offline"
                  )

                  showToast(
                    "Realtime error",
                    "error"
                  )

                }

                if (
                  status ===
                  "TIMED_OUT"
                ) {

                  setRealtimeStatus(
                    "reconnecting"
                  )

                  showToast(
                    "Reconnect database...",
                    "warning"
                  )

                  reconnectTimeoutRef.current =
                    setTimeout(
                      () => {

                        createChannel()

                      },
                      3000
                    )

                }

              }
            )

        channelRef.current =
          channel

      }

    createChannel()

    return () => {

      clearInterval(
        interval
      )

      clearTimeout(
        reconnectTimeoutRef.current
      )

      clearTimeout(
        toastTimeoutRef.current
      )

      if (
        channelRef.current
      ) {

        supabase.removeChannel(
          channelRef.current
        )

      }

    }

  }, [
    notify,
    showToast
  ])

  useEffect(() => {

    const resetUnread =
      () => {

        setUnreadCount(0)

      }

    window.addEventListener(
      "focus",
      resetUnread
    )

    return () => {

      window.removeEventListener(
        "focus",
        resetUnread
      )

    }

  }, [])

  return (

    <div className="
      admin-page
    ">

      <AdminToast
        toast={toast}
      />

      <div className="
        admin-container
      ">

        <div ref={topRef}></div>

        <DashboardHeader
          displayName={
            displayName
          }
          soundOn={soundOn}
          setSoundOn={
            setSoundOn
          }
          exportCSV={
            exportCSV
          }
          navigate={navigate}
          role={role}
          realtimeStatus={
            realtimeStatus
          }
          unreadCount={
            unreadCount
          }
        />

        <StoreToggleCard
          storeStatus={
            storeStatus
          }
          updateStoreStatus={
            updateStoreStatus
          }
        />

        <FilterBar
          search={search}
          setSearch={
            setSearch
          }
          filter={filter}
          setFilter={
            setFilter
          }
          orders={orders}
          formatStatus={
            formatStatus
          }
          debouncedSearch={
            debouncedSearch
          }
          unreadCount={
            unreadCount
          }
        />

        <DashboardStats
          totalPending={
            totalPending
          }
          totalProses={
            totalProses
          }
          totalSelesai={
            totalSelesai
          }
          totalOmzet={
            totalOmzet
          }
          formatRupiah={
            formatRupiah
          }
        />

        {loading && (

          <>
            <SkeletonOrder />
            <SkeletonOrder />
            <SkeletonOrder />
          </>

        )}

        {!loading &&
          filteredOrders
            .length === 0 && (

          <div className="
            admin-empty
          ">

            <div className="
              admin-empty-icon
            ">
              ☕
            </div>

            <div className="
              admin-empty-title
            ">
              Tidak Ada Order
            </div>

            <div className="
              admin-empty-subtitle
            ">
              Manusia lagi hemat
              atau memang dompetnya
              sekarat. Statistik
              ekonomi lokal sulit
              dipastikan.
            </div>

          </div>

        )}

        {!loading &&

          filteredOrders.map(
            order => (

              <OrderCard
                key={order.id}
                order={order}
                currentTime={
                  currentTime
                }
                highlightId={
                  highlightId
                }
                setSelectedOrder={
                  setSelectedOrder
                }
                updateStatus={
                  updateStatus
                }
                getStatusColor={
                  getStatusColor
                }
                formatStatus={
                  formatStatus
                }
                formatRupiah={
                  formatRupiah
                }
                getTimeAgo={
                  getTimeAgo
                }
                getTimeColor={
                  getTimeColor
                }
              />

            )
          )}

        <OrderModal
          selectedOrder={
            selectedOrder
          }
          setSelectedOrder={
            setSelectedOrder
          }
          updateStatus={
            updateStatus
          }
          getStatusColor={
            getStatusColor
          }
          formatStatus={
            formatStatus
          }
          formatRupiah={
            formatRupiah
          }
        />

      </div>

    </div>

  )

}

export default Admin