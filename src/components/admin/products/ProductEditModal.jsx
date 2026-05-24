import {
  useState
} from "react"

import updateProduct
from "../../../services/products/updateProduct"

function ProductEditModal({
  product,
  onClose
}) {

  if (!product) return null

  const [form, setForm] =
    useState({

      name:
        product.name || "",

      price:
        product.price || 0,

      original_price:
        product.originalPrice || 0,

      category:
        product.category || "",

      sort_order:
        product.sort_order || 0,

      is_available:
        product.is_available || false

    })

  function handleChange(
    key,
    value
  ) {

    setForm(prev => ({
      ...prev,
      [key]: value
    }))

  }

  async function handleSave() {

    const result =
      await updateProduct({

        id: product.id,

        updates: form

      })

    if (result.success) {

      onClose()

    }

  }

  return (

    <div
      className="
        admin-modal-overlay
      "

      onClick={onClose}
    >

      <div
        className="
          admin-modal
        "

        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="
          admin-modal-header
        ">

          <h2 className="
            admin-modal-title
          ">
            Edit Product
          </h2>

          <button
            className="
              admin-modal-close
            "

            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* FORM */}

        <div className="
          admin-modal-form
        ">

          <input
            type="text"

            className="
              admin-modal-input
            "

            value={form.name}

            placeholder="
              Product Name
            "

            onChange={(event) =>

              handleChange(
                "name",
                event.target.value
              )

            }
          />

          <input
            type="number"

            className="
              admin-modal-input
            "

            value={form.price}

            placeholder="
              Price
            "

            onChange={(event) =>

              handleChange(
                "price",
                Number(
                  event.target.value
                )
              )

            }
          />

          <input
            type="number"

            className="
              admin-modal-input
            "

            value={
              form.original_price
            }

            placeholder="
              Original Price
            "

            onChange={(event) =>

              handleChange(
                "original_price",

                Number(
                  event.target.value
                )
              )

            }
          />

          <input
            type="text"

            className="
              admin-modal-input
            "

            value={form.category}

            placeholder="
              Category
            "

            onChange={(event) =>

              handleChange(
                "category",
                event.target.value
              )

            }
          />

          <input
            type="number"

            className="
              admin-modal-input
            "

            value={form.sort_order}

            placeholder="
              Sort Order
            "

            onChange={(event) =>

              handleChange(
                "sort_order",

                Number(
                  event.target.value
                )
              )

            }
          />

          {/* TOGGLE */}

          <label className="
            admin-modal-checkbox
          ">

            <span>
              Available
            </span>

            <input
              type="checkbox"

              checked={
                form.is_available
              }

              onChange={(event) =>

                handleChange(
                  "is_available",
                  event.target.checked
                )

              }
            />

          </label>

        </div>

        {/* ACTIONS */}

        <div className="
          admin-modal-actions
        ">

          <button
            className="
              admin-modal-button
              admin-modal-button-cancel
            "

            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="
              admin-modal-button
              admin-modal-button-save
            "

            onClick={handleSave}
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )

}

export default ProductEditModal