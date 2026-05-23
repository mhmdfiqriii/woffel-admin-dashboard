function ProductsCategories({

  selectedCategory = "All",

  onChange = () => {},

  products = []

}) {

  // =====================
  // DYNAMIC CATEGORY
  // =====================

  const categories = [

    "All",

    ...new Set(

      products.map(
        product =>
          product.category
      )

    )

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

              type="button"

              onClick={() =>
                onChange(category)
              }

              className={`
                admin-category-pill

                ${
                  selectedCategory ===
                  category

                    ? `
                      admin-category-pill-active
                    `

                    : ""
                }
              `}
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