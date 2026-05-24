import {
  useState
} from "react"

import updateProduct
from "../../../services/products/updateProduct"

function ProductEditModal({
  product,
  onClose
}) {

  const safeProduct =
    product || {}

  const [form, setForm] =
    useState({

      name:
        safeProduct.name || "",

      price:
        safeProduct.price || 0,

      original_price:
        safeProduct.originalPrice || 0,

      category:
        safeProduct.category || "",

      sort_order:
        safeProduct.sort_order || 0,

      is_available:
        safeProduct.is_available || false

    })

  if (!product) return null

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

        <h2>
          Edit Product
        </h2>

        <input
          type="text"

          value={form.name}

          placeholder="Name"

          onChange={(event) =>

            setForm(prev => ({
              ...prev,
              name:
                event.target.value
            }))

          }
        />

        <input
          type="number"

          value={form.price}

          placeholder="Price"

          onChange={(event) =>

            setForm(prev => ({
              ...prev,
              price:
                Number(
                  event.target.value
                )
            }))

          }
        />

        <input
          type="number"

          value={
            form.original_price
          }

          placeholder="
            Original Price
          "

          onChange={(event) =>

            setForm(prev => ({
              ...prev,
              original_price:
                Number(
                  event.target.value
                )
            }))

          }
        />

        <input
          type="text"

          value={form.category}

          placeholder="Category"

          onChange={(event) =>

            setForm(prev => ({
              ...prev,
              category:
                event.target.value
            }))

          }
        />

        <input
          type="number"

          value={form.sort_order}

          placeholder="
            Sort Order
          "

          onChange={(event) =>

            setForm(prev => ({
              ...prev,
              sort_order:
                Number(
                  event.target.value
                )
            }))

          }
        />

        <label>

          Available

          <input
            type="checkbox"

            checked={
              form.is_available
            }

            onChange={(event) =>

              setForm(prev => ({
                ...prev,
                is_available:
                  event.target.checked
              }))

            }
          />

        </label>

        <button
          onClick={handleSave}
        >
          Save
        </button>

        <button
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>

  )

}

export default ProductEditModal