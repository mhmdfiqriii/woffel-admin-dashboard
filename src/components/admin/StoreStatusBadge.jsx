function StoreToggleCard({
  storeStatus,
  updateStoreStatus
}) {

  const isOpen =
    storeStatus
      ?.admin_status ===
    "online"

  return (

    <div
      className={`
        admin-store-card
        ${
          isOpen
            ? "admin-store-open"
            : "admin-store-closed"
        }
      `}
    >

      <div className="
        admin-store-glow
      "></div>

      <div className="
        admin-store-top
      ">

        <div className="
          admin-store-brand
        ">

          <div className="
            admin-store-icon
          ">
            🛒
          </div>

          <div>

            <div className="
              admin-store-label
            ">
              GLOBAL STORE
            </div>

            <div className="
              admin-store-name
            ">
              Woffel Store
            </div>

          </div>

        </div>

        <div
          className={`
            admin-store-status
            ${
              isOpen
                ? "admin-store-status-open"
                : "admin-store-status-closed"
            }
          `}
        >

          <div className="
            admin-store-status-dot
          "></div>

          <span>
            {isOpen
              ? "ONLINE"
              : "OFFLINE"}
          </span>

        </div>

      </div>

      <div className="
        admin-store-bottom
      ">

        <div className="
          admin-store-desc
        ">

          {isOpen

            ? `
              Semua store aktif
              dan customer bisa
              checkout order.
            `

            : `
              Semua store ditutup.
              Customer tidak bisa
              checkout sementara.
            `
          }

        </div>

        <button

          onClick={() =>

            updateStoreStatus(
              !isOpen
            )

          }

          className={`
            admin-store-toggle
            ${
              isOpen
                ? "admin-store-toggle-open"
                : "admin-store-toggle-closed"
            }
          `}
        >

          {isOpen
            ? "Matikan Store"
            : "Aktifkan Store"}

        </button>

      </div>

    </div>

  )

}

export default StoreToggleCard