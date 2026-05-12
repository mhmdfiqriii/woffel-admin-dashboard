function OrderCard({
  order,
  highlightId,
  setSelectedOrder,
  updateStatus,
  getStatusColor,
  formatStatus,
  formatRupiah,
  getTimeAgo,
  getTimeColor
}) {

  return (

    <div

      onClick={() =>
        setSelectedOrder(order)
      }

      className={`admin-order ${
        highlightId === order.id
          ? "admin-order-highlight"
          : ""
      } ${
        order.status === "selesai"
          ? "admin-order-done"
          : ""
      }`}

      style={{
        borderLeft:
          `6px solid ${getStatusColor(order.status)}`
      }}

    >

      <div className="admin-order-top">

        <span className="admin-order-type">
          {order.type.toUpperCase()}
        </span>

        <span
          className="admin-order-badge"
          style={{
            background:
              getStatusColor(order.status)
          }}
        >
          {formatStatus(order.status)}
        </span>

      </div>

      <div className="admin-order-id">
        {order.order_id}
      </div>

      <div
        className="admin-order-time"
        style={{
          color:
            getTimeColor(order.created_at)
        }}
      >
        ⏱️ {getTimeAgo(order.created_at)}
      </div>

      <div className="admin-order-bottom">

        <span className="admin-order-price">
          Rp {formatRupiah(order.price)}
        </span>

        <div className="admin-order-actions">

          <button

            onClick={(e) => {

              e.stopPropagation()

              updateStatus(
                order.id,
                "proses"
              )

            }}

            disabled={
              order.status !== "pending"
            }

            className={`admin-btn-quick ${
              order.status === "pending"
                ? "admin-btn-proses"
                : "admin-btn-disabled"
            }`}

          >
            P
          </button>

          <button

            onClick={(e) => {

              e.stopPropagation()

              updateStatus(
                order.id,
                "selesai"
              )

            }}

            disabled={
              order.status === "selesai"
            }

            className={`admin-btn-quick ${
              order.status !== "selesai"
                ? "admin-btn-selesai"
                : "admin-btn-disabled"
            }`}

          >
            D
          </button>

        </div>

      </div>

    </div>

  )

}

export default OrderCard