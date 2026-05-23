import {
  ChevronRight
} from "lucide-react"

function BrandCard({

  logo,
  title = "Brand",
  total = 0,
  onClick

}) {

  return (

    <button
      type="button"
      onClick={onClick}
      className="
        admin-brand-card
      "
    >

      <div className="
        admin-brand-left
      ">

        <div className="
          admin-brand-logo
        ">

          <img
            src={logo}
            alt={title}
            className="
              admin-brand-logo-img
            "
          />

        </div>

        <div className="
          admin-brand-info
        ">

          <div className="
            admin-brand-title
          ">

            {title}

          </div>

          <div className="
            admin-brand-total
          ">

            {total} Products

          </div>

        </div>

      </div>

      <ChevronRight
        size={22}
        className="
          admin-brand-arrow
        "
      />

    </button>

  )

}

export default BrandCard