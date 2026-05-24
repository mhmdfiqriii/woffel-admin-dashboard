import {
  useState
} from "react"

import updateProduct
from "../../../services/products/updateProduct"

import createProduct
from "../../../services/products/createProduct"

function ProductEditModal({
  product,
  onClose
}) {

  const safeProduct =
    product || {}

  const isCreateMode =
    !safeProduct?.id

  const [form, setForm] =
    useState({

      name:
        safeProduct.name || "",

      price:
        safeProduct.price || 0,

      original_price:
        safeProduct.original_price || 0,

      image_url:
        safeProduct.image_url || "",

      category:
        safeProduct.category || "",

      sort_order:
        safeProduct.sort_order || 0,

      is_available:
        safeProduct.is_available || false

    })

  if (!product) return null

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

    const payload = {

      ...form,

      brand:
        product.brand ||

        "Kopi Kenangan"

    }

    const result =

      isCreateMode

        ? await createProduct(
            payload
          )

        : await updateProduct({

            id: product.id,

            updates: payload

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

            {
              isCreateMode

                ? "Create Product"

                : "Edit Product"
            }

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

            value={
              form.image_url
            }

            placeholder="
              Image URL
            "

            onChange={(event) =>

              handleChange(
                "image_url",
                event.target.value
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