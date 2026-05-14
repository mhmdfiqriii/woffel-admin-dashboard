function StoreToggleCard({
  store,
  isOpen,
  loading,
  onToggle
}) {

  const storeConfig = {

    kopken: {
      label:
        "Kopi Kenangan",

      emoji:
        "☕"
    },

    fore: {
      label:
        "Fore Coffee",

      emoji:
        "⚡"
    },

    tomoro: {
      label:
        "Tomoro Coffee",

      emoji:
        "🟠"
    }

  }

  const currentStore =
    storeConfig[store] || {

      label: store,
      emoji: "🏪"

    }

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
            {currentStore.emoji}
          </div>

          <div>

            <div className="
              admin-store-label
            ">
              STORE
            </div>

            <div className="
              admin-store-name
            ">
              {currentStore.label}
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
              ? "BUKA"
              : "TUTUP"}
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
            ? "Store aktif dan bisa menerima order."
            : "Store dimatikan. Customer ga bisa checkout."}

        </div>

        <button

          onClick={() =>
            onToggle?.(
              store,
              !isOpen
            )
          }

          disabled={loading}

          className={`
            admin-store-toggle
            ${
              isOpen
                ? "admin-store-toggle-open"
                : "admin-store-toggle-closed"
            }
            ${
              loading
                ? "admin-store-toggle-loading"
                : ""
            }
          `}
        >

          {loading
            ? "..."
            : isOpen
              ? "Tutup Store"
              : "Buka Store"}

        </button>

      </div>

    </div>

  )

}

export default StoreToggleCard