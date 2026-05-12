function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  orders,
  formatStatus
}) {

  const filters = [
    "all",
    "pending",
    "proses",
    "selesai"
  ]

  return (

    <div className="admin-filter">

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
          className="
            admin-filter-search
          "
        />

      </div>

      <div className="admin-filter-scroll">

        <div className="admin-filter-row">

          {filters.map(f => {

            const count =
              f === "all"
                ? orders.length
                : orders.filter(
                    o =>
                      o.status === f
                  ).length

            return (

              <button
                key={f}
                onClick={() =>
                  setFilter(f)
                }
                className={`admin-filter-btn ${
                  filter === f
                    ? `
                      admin-filter-btn-active
                    `
                    : ""
                }`}
              >

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