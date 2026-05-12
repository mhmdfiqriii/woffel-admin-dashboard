function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  orders,
  formatStatus
}) {

  return (

    <div className="admin-filter">

      <input
        placeholder="Cari ID/Kode Order."
        value={search}
        onChange={e =>
          setSearch(e.target.value)
        }
        className="admin-filter-search"
      />

      <div className="admin-filter-row">

        {[
          "all",
          "pending",
          "proses",
          "selesai"
        ].map(f => {

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
                  ? "admin-filter-btn-active"
                  : ""
              }`}
            >
              {formatStatus(f)}
              {" "}
              ({count})
            </button>

          )

        })}

      </div>

    </div>

  )

}

export default FilterBar