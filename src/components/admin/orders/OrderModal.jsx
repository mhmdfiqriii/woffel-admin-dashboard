function OrderModal({
  selectedOrder,
  setSelectedOrder,
  updateStatus,
  formatStatus,
  formatRupiah
}) {

  if (!selectedOrder) return null

  let items = []

  try {

    const parsed =
      JSON.parse(
        selectedOrder.variant
      )

    if (Array.isArray(parsed)) {
      items = parsed
    }

  } catch {

    if (
      selectedOrder.variant
        ?.includes("||")
    ) {

      items =
        selectedOrder.variant
          .split("||")
          .map(v => ({
            name: v,
            qty: "",
            options: ""
          }))

    }

  }

  return (

    <div

      className="
        admin-modal-overlay
      "

      onClick={() =>
        setSelectedOrder(null)
      }

    >

      <div

        className={`
          admin-modal
          status-${selectedOrder.status}
        `}

        onClick={(e) =>
          e.stopPropagation()
        }

      >

        <div className="
          admin-modal-handle
        "></div>

        <div className="
          admin-modal-header
        ">

          <div className="
            admin-modal-header-left
          ">

            <div className="
              admin-modal-label
            ">
              ORDER ID
            </div>

            <div className="
              admin-modal-id
            ">
              {selectedOrder.order_id}
            </div>

          </div>

          <div
            className={`
              admin-order-badge
              admin-order-badge-${selectedOrder.status}
            `}
          >

            {formatStatus(
              selectedOrder.status
            )}

          </div>

        </div>

        <div className="
          admin-modal-meta
        ">

          <div className="
  admin-modal-meta-card
">

  <div className="
    admin-modal-meta-label
  ">
    Waktu Order
  </div>

  <div className="
    admin-modal-meta-value
  ">

    {
      new Date(
        selectedOrder.created_at
      ).toLocaleString(
        "id-ID",
        {
          timeZone:
            "Asia/Jakarta",

          day:
            "numeric",

          month:
            "short",

          hour:
            "2-digit",

          minute:
            "2-digit"
        }
      )
    }

  </div>

</div>

          <div className="
            admin-modal-meta-card
          ">

            <div className="
              admin-modal-meta-label
            ">
              Status
            </div>

            <div className="
              admin-modal-meta-value
            ">

              {formatStatus(
                selectedOrder.status
              )}

            </div>

          </div>

        </div>

        <div className="
          admin-modal-section
        ">

          <div className="
            admin-modal-section-title
          ">
            Customer
          </div>

          <div className="
            admin-modal-card
          ">

            <div className="
              admin-modal-customer
            ">

              {selectedOrder.customer_name ||
                "Customer Tidak Ada"}

            </div>

            {selectedOrder.updated_by && (

              <div className="
                admin-modal-sub
              ">

                Update oleh
                {" "}
                <span className="
                  admin-modal-sub-highlight
                ">

                  {selectedOrder.updated_by}

                </span>

              </div>

            )}

          </div>

        </div>

        <div className="
          admin-modal-section
        ">

          <div className="
            admin-modal-section-title
          ">
            Pesanan
          </div>

          <div className="
            admin-modal-items
          ">

            {selectedOrder.type === "fnb"

              ? (

                items.map(
                  (item, i) => (

                  <div

                    key={i}

                    className="
                      admin-modal-item
                    "

                  >

                    <div className="
                      admin-modal-item-top
                    ">

                      <div className="
                        admin-modal-item-left
                      ">

                        <div className="
                          admin-modal-item-index
                        ">
                          {i + 1}
                        </div>

                        <div className="
                          admin-modal-item-name
                        ">

                          {item.name}

                        </div>

                      </div>

                      <div className="
                        admin-modal-item-qty
                      ">

                        x
                        {item.qty || 1}

                      </div>

                    </div>

                    {item.options && (

                      <div className="
                        admin-modal-item-option
                      ">

                        {item.options}

                      </div>

                    )}

                  </div>

                ))

              ) : (

                <div className="
                  admin-modal-item
                ">

                  <div className="
                    admin-modal-item-name
                  ">

                    {selectedOrder.variant}

                  </div>

                </div>

              )}

          </div>

        </div>

        <div className="
          admin-modal-section
        ">

          <div className="
            admin-modal-section-title
          ">
            Pembayaran
          </div>

          <div className="
            admin-modal-total-card
          ">

            <div className="
              admin-modal-total-label
            ">
              Total Bayar
            </div>

            <div className="
              admin-modal-total-price
            ">

              Rp
              {" "}

              {formatRupiah(
                selectedOrder.price
              )}

            </div>

          </div>

        </div>

        <div className="
          admin-modal-footer
        ">

          <div className="
            admin-modal-footer-actions
          ">

            <button

              className={`
                admin-btn-modal

                ${
                  selectedOrder.status !==
                  "pending"

                    ? `
                      admin-btn-disabled
                    `

                    : `
                      admin-btn-proses
                    `
                }
              `}

              disabled={
                selectedOrder.status !==
                "pending"
              }

              onClick={() =>
                updateStatus(
                  selectedOrder.id,
                  "proses"
                )
              }

            >

              Proses

            </button>

            <button

              className={`
                admin-btn-modal

                ${
                  selectedOrder.status ===
                  "selesai"

                    ? `
                      admin-btn-disabled
                    `

                    : `
                      admin-btn-selesai
                    `
                }
              `}

              disabled={
                selectedOrder.status ===
                "selesai"
              }

              onClick={() =>
                updateStatus(
                  selectedOrder.id,
                  "selesai"
                )
              }

            >

              Selesai

            </button>

          </div>

          <button

            className="
              admin-btn-close
            "

            onClick={() =>
              setSelectedOrder(null)
            }

          >

            Tutup

          </button>

        </div>

      </div>

    </div>

  )

}

export default OrderModal