import {
  useState
} from "react"

import updateProduct
from "../../../services/products/updateProduct"

import createProduct
from "../../../services/products/createProduct"

function getInitialForm(
  product = {}
) {

  return {

    id:
      product.id ?? null,

    name:
      product.name || "",

    price:
      product.price ?? "",

    original_price:
      product.original_price ?? "",

    image_url:
      product.image_url || "",

    category:
      product.category || "",

    sort_order:
      product.sort_order ?? "",

    is_available:
      product.is_available ?? true

  }

}

function ProductEditModal({
  product,
  onClose
}) {

  const safeProduct =
    product || {}

  const isCreateMode =
    !safeProduct?.id

  const [
    form,
    setForm
  ] = useState(() =>

    getInitialForm(
      safeProduct
    )

  )

  if (product === null) {
    return null
  }

  // =====================
  // SYNC PRODUCT
  // =====================

  if (
    form.id !==
    safeProduct.id
  ) {

    const nextForm =
      getInitialForm(
        safeProduct
      )

    setForm(nextForm)

  }

  // =====================
  // HANDLE CHANGE
  // =====================

  function handleChange(
    key,
    value
  ) {

    setForm(prev => ({

      ...prev,

      [key]: value

    }))

  }

  // =====================
  // SAVE
  // =====================

  async function handleSave() {

    if (!form.name.trim()) {

      alert(
        "Product name wajib diisi"
      )

      return

    }

    if (!form.category.trim()) {

      alert(
        "Category wajib diisi"
      )

      return

    }

    if (
      form.price === ""
    ) {

      alert(
        "Price wajib diisi"
      )

      return

    }

    if (
      Number(form.price) < 0
    ) {

      alert(
        "Price tidak boleh minus"
      )

      return

    }

    if (
      Number(
        form.original_price
      ) < 0
    ) {

      alert(
        "Original price tidak boleh minus"
      )

      return

    }

    if (
      Number(
        form.sort_order
      ) < 0
    ) {

      alert(
        "Sort order tidak boleh minus"
      )

      return

    }

    const payload = {

      ...form,

      name:
        form.name.trim(),

      category:
        form.category.trim(),

      brand:
        safeProduct.brand ||
        "Kopi Kenangan"

    }

    const result =

      isCreateMode

        ? await createProduct(
            payload
          )

        : await updateProduct({

            id:
              safeProduct.id,

            updates:
              payload

          })

    if (result.success) {

      onClose()

    } else {

      alert(
        "Gagal simpan product"
      )

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

        <div
          className="
            admin-modal-header
          "
        >

          <h2
            className="
              admin-modal-title
            "
          >

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

        <div
          className="
            admin-modal-form
          "
        >

          <input
            type="text"

            className="
              admin-modal-input
            "

            value={form.name}

            placeholder="Product Name"

            onChange={(event) =>

              handleChange(
                "name",
                event.target.value
              )

            }
          />

          <input
            type="number"

            min="0"

            className="
              admin-modal-input
            "

            value={form.price}

            placeholder="Price"

            onChange={(event) => {

              const value =
                event.target.value

              handleChange(

                "price",

                value === ""
                  ? ""
                  : Number(value)

              )

            }}
          />

          <input
            type="number"

            min="0"

            className="
              admin-modal-input
            "

            value={
              form.original_price
            }

            placeholder="
              Original Price
            "

            onChange={(event) => {

              const value =
                event.target.value

              handleChange(

                "original_price",

                value === ""
                  ? ""
                  : Number(value)

              )

            }}
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

            value={
              form.category
            }

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

            min="0"

            className="
              admin-modal-input
            "

            value={
              form.sort_order
            }

            placeholder="
              Sort Order
            "

            onChange={(event) => {

              const value =
                event.target.value

              handleChange(

                "sort_order",

                value === ""
                  ? ""
                  : Number(value)

              )

            }}
          />

          <label
            className="
              admin-modal-checkbox
            "
          >

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

        <div
          className="
            admin-modal-actions
          "
        >

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