function OrderCard({
  order,
  highlightId,
  setSelectedOrder,
  updateStatus,
  formatStatus,
  formatRupiah,
  getTimeAgo,
  currentTime,
  getTimeColor
}) {

  const isHighlighted =
    highlightId === order.id

  const isPending =
    order.status === "pending"

  const isDone =
    order.status === "selesai"

  const createdTime =
  new Date(
    order.created_at
  ).getTime()

  const isNewOrder =
  currentTime - createdTime
  < 120000

  return (

    <div

      onClick={() =>
        setSelectedOrder(order)
      }

      className={`
        admin-order
        status-${order.status}

        ${
          isHighlighted
            ? `
              admin-order-highlight
            `
            : ""
        }

        ${
          isDone
            ? `
              admin-order-done
            `
            : ""
        }

        ${
          isPending
            ? `
              admin-order-priority
            `
            : ""
        }

        ${
          isNewOrder
            ? `
              admin-order-unread
            `
            : ""
        }
      `}

    >

      <div className="
        admin-order-glow
      "></div>

      <div className="
        admin-order-realtime
      "></div>

      <div className="
        admin-order-top
      ">

        <div className="
          admin-order-type-wrap
        ">

          <span className="
            admin-order-type
          ">
            {order.type?.toUpperCase()}
          </span>

          {isNewOrder && (

            <div className="
              admin-order-new-badge
            ">
              NEW
            </div>

          )}

        </div>

        <div
          className={`
            admin-order-badge
            admin-order-badge-${order.status}
          `}
        >

          {formatStatus(
            order.status
          )}

        </div>

      </div>

      <div className="
        admin-order-main
      ">

        <div className="
          admin-order-id
        ">
          {order.order_id}
        </div>

        <div className="
          admin-order-customer
        ">

          {order.customer_name ||
            "Customer Tidak Ada"}

        </div>

      </div>

      <div className="
        admin-order-bottom
      ">

        <div className="
          admin-order-info
        ">

          <div

            className="
              admin-order-time
            "

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

          <div className="
            admin-order-price
          ">

            Rp
            {" "}

            {formatRupiah(
              order.price
            )}

          </div>

        </div>

        <div className="
          admin-order-actions
        ">

          <button

            onClick={(e) => {

              e.stopPropagation()

              updateStatus(
                order.id,
                "proses"
              )

            }}

            disabled={
              order.status !==
              "pending"
            }

            className={`
              admin-btn-quick

              ${
                order.status ===
                "pending"

                  ? `
                    admin-btn-proses
                  `

                  : `
                    admin-btn-disabled
                  `
              }
            `}

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
              order.status ===
              "selesai"
            }

            className={`
              admin-btn-quick

              ${
                order.status !==
                "selesai"

                  ? `
                    admin-btn-selesai
                  `

                  : `
                    admin-btn-disabled
                  `
              }
            `}

          >

            D

          </button>

        </div>

      </div>

    </div>

  )

}

export default OrderCard