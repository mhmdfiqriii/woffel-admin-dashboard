function ProductsCategories() {

  const categories = [
    "All",
    "Coffee",
    "Non Coffee",
    "Snack"
  ]

  return (

    <div className="
      admin-category-scroll
    ">

      <div className="
        admin-category-row
      ">

        {categories.map(
          category => (

            <button
              key={category}
              className="
                admin-category-pill
              "
            >
              {category}
            </button>

          )
        )}

      </div>

    </div>

  )

}

export default ProductsCategories