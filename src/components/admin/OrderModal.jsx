function OrderModal({
  selectedOrder,
  setSelectedOrder,
  updateStatus,
  getStatusColor,
  formatStatus,
  formatRupiah
}) {

  if (!selectedOrder) return null

  let items = []

  try {

    const parsed =
      JSON.parse(selectedOrder.variant)

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
      className="admin-modal-overlay"
      onClick={() =>
        setSelectedOrder(null)
      }
    >

      <div
        className="admin-modal"
        onClick={e =>
          e.stopPropagation()
        }
      >

        <div className="admin-modal-header">

          <div className="admin-modal-id">
            {selectedOrder.order_id}
          </div>

          <div
            className="admin-modal-status"
            style={{
              background:
                getStatusColor(selectedOrder.status)
            }}
          >
            {formatStatus(selectedOrder.status)}
          </div>

        </div>

        <div className="admin-modal-subtitle">

          {selectedOrder.type.toUpperCase()}

        </div>

        {selectedOrder.updated_by && (

          <div className="admin-modal-item-sub">

            Diupdate oleh:
            {" "}
            {selectedOrder.updated_by}

          </div>

        )}

        {selectedOrder.updated_at && (

          <div className="admin-modal-item-sub">

            {new Date(selectedOrder.updated_at)
              .toLocaleString(
                "id-ID",
                {
                  timeZone:
                    "Asia/Jakarta"
                }
              )}

          </div>

        )}

        <div className="admin-modal-section">

          <div className="admin-modal-label">
            Pesanan
          </div>

          {selectedOrder.type === "fnb" && (

            items.map((item, i) => (

              <div
                key={i}
                className="admin-modal-item"
              >

                <div>
                  {i + 1}. {item.name}
                </div>

                <div className="admin-modal-item-sub">

                  Qty:
                  {" "}
                  {item.qty || "-"}

                </div>

                {item.options && (

                  <div className="admin-modal-item-sub">
                    {item.options}
                  </div>

                )}

              </div>

            ))

          )}

          {selectedOrder.type !== "fnb" && (

            <div className="admin-modal-item">
              {selectedOrder.variant}
            </div>

          )}

        </div>

        <div className="admin-modal-total">

          <div className="admin-modal-label">
            Total
          </div>

          <div className="admin-modal-total-price">

            Rp
            {" "}
            {formatRupiah(selectedOrder.price)}

          </div>

        </div>

        <div className="admin-modal-actions">

          <button
            className={`admin-btn-modal ${
              selectedOrder.status !== "pending"
                ? "admin-btn-disabled"
                : "admin-btn-proses"
            }`}
            disabled={
              selectedOrder.status !== "pending"
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
            className={`admin-btn-modal ${
              selectedOrder.status === "selesai"
                ? "admin-btn-disabled"
                : "admin-btn-selesai"
            }`}
            disabled={
              selectedOrder.status === "selesai"
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
          className="admin-btn-close"
          onClick={() =>
            setSelectedOrder(null)
          }
        >
          Tutup
        </button>

      </div>

    </div>

  )

}

export default OrderModal