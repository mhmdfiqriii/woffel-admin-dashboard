function OrderCard({
  order,
  highlightId,
  setSelectedOrder,
  updateStatus,
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

      className={`admin-order status-${order.status} ${
        highlightId === order.id
          ? "admin-order-highlight"
          : ""
      } ${
        order.status === "selesai"
          ? "admin-order-done"
          : ""
      }`}

    >

      <div className="admin-order-glow"></div>

      <div className="admin-order-top">

        <div className="admin-order-type-wrap">

          <span className="admin-order-type">
            {order.type?.toUpperCase()}
          </span>

        </div>

        <div
          className={`
            admin-order-badge
            admin-order-badge-${order.status}
          `}
        >
          {formatStatus(order.status)}
        </div>

      </div>

      <div className="admin-order-main">

        <div className="admin-order-id">
          {order.order_id}
        </div>

        <div className="admin-order-customer">
          {order.customer_name ||
            "Customer Tidak Ada"}
        </div>

      </div>

      <div className="admin-order-bottom">

        <div className="admin-order-info">

          <div
            className="admin-order-time"
            style={{
              color:
                getTimeColor(
                  order.created_at
                )
            }}
          >
            ⏱
            {" "}
            {getTimeAgo(
              order.created_at
            )}
          </div>

          <div className="admin-order-price">
            Rp
            {" "}
            {formatRupiah(order.price)}
          </div>

        </div>

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