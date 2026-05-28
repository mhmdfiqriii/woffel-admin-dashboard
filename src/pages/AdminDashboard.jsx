import {
  useState,
  useRef
} from "react"
import {
  useNavigate
} from "react-router-dom"

import "../components/admin/admin.css"

import DashboardHeader
from "../components/admin/dashboard/DashboardHeader"

import FilterBar
from "../components/admin/orders/FilterBar"

import OrderCard
from "../components/admin/orders/OrderCard"

import OrderModal
from "../components/admin/orders/OrderModal"

import AdminToast
from "../components/admin/shared/AdminToast"

import SkeletonOrder
from "../components/admin/orders/SkeletonOrder"

import useOrders
from "../hooks/useOrders"

import useRealtimeOrders
from "../hooks/useRealtimeOrders"

import useAdminSound
from "../hooks/useAdminSound"

import useStoreStatus
from "../hooks/useStoreStatus"

import useAuthAdmin
from "../hooks/useAuthAdmin"

import useAdminToast
from "../hooks/useAdminToast"

import useCurrentTime
from "../hooks/useCurrentTime"

import useHighlightOrder
from "../hooks/useHighlightOrder"

import useUnreadOrders
from "../hooks/useUnreadOrders"

import useDebounce
from "../hooks/useDebounce"

import useAdminUser
from "../hooks/useAdminUser"

import useOrderActions
from "../hooks/useOrderActions"

import EmptyOrders
from "../components/admin/orders/EmptyOrders"

import AdminLayout
from "../components/admin/shared/AdminLayout"

import {
  DEFAULT_FILTER
} from "../constants/adminConfig"

import {
  formatRupiah,
  formatStatus,
  getStatusColor,
  getTimeAgo,
  getTimeColor
} from "../utils/adminUtils"

function AdminDashboard() {

  const [filter, setFilter] =
    useState(DEFAULT_FILTER)

  const [search, setSearch] =
    useState("")

const debouncedSearch =
  useDebounce(search)

    const {
  orders,
  setOrders,
  loading,
  filteredOrders,
  updateOrderStatus
} = useOrders(
  filter,
  debouncedSearch
)

const {
  highlightId,
  setHighlightId
} = useHighlightOrder()

  const [
    selectedOrder,
    setSelectedOrder
  ] = useState(null)

  const [
    realtimeStatus,
    setRealtimeStatus
  ] = useState("connecting")

 const currentTime =
  useCurrentTime()

  const topRef = useRef(null)

  const navigate =
    useNavigate()

  const {
  playNewOrder,
  playProses,
  playDone
} = useAdminSound()

const {
  toast,
  showToast
} = useAdminToast()

const {
  unreadCount,
  notify
} = useUnreadOrders({
  playNewOrder,
  showToast
})

const {
  adminUser,
  displayName
} = useAdminUser()
    
  const {
  setStoreStatus
} = useStoreStatus(
  showToast
)

    useRealtimeOrders({
  notify,
  setOrders,
  setHighlightId,
  setRealtimeStatus,
  setStoreStatus,
  showToast,
  topRef
})

const {
  updateStatus
} = useOrderActions({
  updateOrderStatus,
  adminUser,
  playProses,
  playDone,
  showToast,
  setSelectedOrder
})

  useAuthAdmin(
  navigate
)

  return (

  <AdminLayout>

    <AdminToast
      toast={toast}
    />

    <div ref={topRef}></div>

    <DashboardHeader
      displayName={
        displayName
      }
      realtimeStatus={
        realtimeStatus
      }
      unreadCount={
        unreadCount
      }
    />

    <div className="
      admin-orders-section
    ">

      <div className="
        admin-orders-head
      ">

        <h2 className="
          admin-orders-title
        ">
          Live Orders
        </h2>

        <span className="
          admin-orders-count
        ">
          {filteredOrders.length}
        </span>

      </div>

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

      {loading && (
        <>
          <SkeletonOrder />
          <SkeletonOrder />
          <SkeletonOrder />
        </>
      )}

      {!loading &&
        filteredOrders.length === 0 && (
          <EmptyOrders />
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

    </div>

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

  </AdminLayout>

)

}

export default AdminDashboard