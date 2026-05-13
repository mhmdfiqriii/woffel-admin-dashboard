function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  orders,
  formatStatus,
  debouncedSearch,
  unreadCount
}) {

  const filters = [
    "all",
    "pending",
    "proses",
    "selesai"
  ]

  return (

    <div className="admin-filter">

      <div className="admin-filter-top">

        <div className="admin-filter-search-wrap">

          <div className="admin-filter-search-icon">
            ⌕
          </div>

          <input
            placeholder="
              Cari ID / customer...
            "
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
            className={`
              admin-filter-search
              ${
                search !==
                debouncedSearch
                  ? `
                    admin-filter-search-loading
                  `
                  : ""
              }
            `}
          />

          {search !==
            debouncedSearch && (

            <div className="
              admin-filter-search-spinner
            ">

              <div className="
                admin-filter-search-dot
              "></div>

            </div>

          )}

        </div>

        {unreadCount > 0 && (

          <div className="
            admin-filter-unread
          ">

            <span className="
              admin-filter-unread-dot
            "></span>

            {unreadCount}
            {" "}
            baru

          </div>

        )}

      </div>

      <div className="
        admin-filter-scroll
      ">

        <div className="
          admin-filter-row
        ">

          {filters.map(f => {

            const count =

              f === "all"
                ? orders.length

                : orders.filter(
                    o =>
                      o.status === f
                  ).length

            const isActive =
              filter === f

            return (

              <button

                key={f}

                onClick={() =>
                  setFilter(f)
                }

                className={`
                  admin-filter-btn
                  ${
                    isActive
                      ? `
                        admin-filter-btn-active
                      `
                      : ""
                  }
                `}

              >

                <div className="
                  admin-filter-btn-glow
                "></div>

                <span>
                  {formatStatus(f)}
                </span>

                <span className="
                  admin-filter-count
                ">
                  {count}
                </span>

              </button>

            )

          })}

        </div>

      </div>

    </div>

  )

}

export default FilterBar