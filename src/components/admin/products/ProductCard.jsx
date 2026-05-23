function ProductCard({

  name = "Americano",

  category = "Coffee",

  price = 18000,

  image = "",

  available = true

}) {

  const formattedPrice =
    Number(price)
      .toLocaleString("id-ID")

  return (

    <div className="
      admin-product-card
    ">

      <div className="
        admin-product-image
      ">

        <img
          src={image}
          alt={name}
          className="
            admin-product-image-tag
          "
        />

      </div>

      <div className="
        admin-product-body
      ">

        <div className="
          admin-product-category
        ">

          {category}

        </div>

        <div className="
          admin-product-name
        ">

          {name}

        </div>

        <div className="
          admin-product-price
        ">

          Rp. {formattedPrice}

        </div>

      </div>

      <button
        type="button"
        className={`
          admin-product-toggle

          ${
            available

              ? `
                admin-product-toggle-active
              `

              : ""
          }
        `}
      >

        <div className="
          admin-product-toggle-thumb
        "></div>

      </button>

    </div>

  )

}

export default ProductCard