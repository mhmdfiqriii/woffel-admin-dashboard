function ProductCard({

  name = "Americano",

  category = "Coffee",

  price = 18000,

  originalPrice = 18000,

  image = "",

  available = true,

  onToggle = () => {},

  onClick = () => {},

  onDelete = () => {}

}) {

  const formattedPrice =
    Number(price)
      .toLocaleString("id-ID")

  const formattedOriginalPrice =
    Number(originalPrice)
      .toLocaleString("id-ID")

  const isPromo =
    originalPrice > price

  return (

    <div
      className="
        admin-product-card
      "

      onClick={onClick}
    >

      {/* UNAVAILABLE */}

      {!available && (

        <div className="
          admin-product-overlay
        ">
          Unavailable
        </div>

      )}

      {/* DELETE */}

      <button
        type="button"

        className="
          admin-product-delete
        "

        onClick={(event) => {

          event.stopPropagation()

          const confirmDelete =
            window.confirm(
              `Hapus ${name}?`
            )

          if (confirmDelete) {

            onDelete()

          }

        }}
      >
        🗑
      </button>

      {/* EDIT BADGE */}

      <div className="
        admin-product-edit
      ">
        Edit
      </div>

      {/* IMAGE */}

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

        {/* PROMO BADGE */}

        {isPromo && (

          <div className="
            admin-product-badge
          ">
            Promo
          </div>

        )}

      </div>

      {/* BODY */}

      <div className="
        admin-product-body
      ">

        {/* CATEGORY */}

        <div className="
          admin-product-category
        ">

          {category}

        </div>

        {/* NAME */}

        <div className="
          admin-product-name
        ">

          {name}

        </div>

        {/* PRICE */}

        <div className="
          admin-product-prices
        ">

          <div className="
            admin-product-price
          ">

            Rp {formattedPrice}

          </div>

          {isPromo && (

            <div className="
              admin-product-original-price
            ">

              Rp {formattedOriginalPrice}

            </div>

          )}

        </div>

      </div>

      {/* TOGGLE */}

      <button
        type="button"

        onClick={(event) => {

          event.stopPropagation()

          onToggle()

        }}

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