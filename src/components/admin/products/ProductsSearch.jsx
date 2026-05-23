function ProductsSearch({

  value = "",

  onChange = () => {}

}) {

  return (

    <div className="
      admin-filter-search-wrap
    ">

      <input
        type="text"

        value={value}

        onChange={event =>

          onChange(
            event.target.value
          )

        }

        placeholder="Cari produk..."

        className="
          admin-filter-search
        "
      />

    </div>

  )

}

export default ProductsSearch