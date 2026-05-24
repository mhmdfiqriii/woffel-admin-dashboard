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
    product.is_available ?? true,

  options:
    JSON.stringify(
      product.options || {},
      null,
      2
    )
}
}

function ProductEditModal({
  product,
  onClose,
  showToast
}) {

  const safeProduct =
    product || {}

  const isCreateMode =
    !safeProduct?.id

  const [
    saving,
    setSaving
  ] = useState(false)

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

    if (saving) return

    if (!form.name.trim()) {

      showToast(
        "Product name wajib diisi",
        "warning"
      )

      return

    }

    if (!form.category.trim()) {

      showToast(
        "Category wajib diisi",
        "warning"
      )

      return

    }

    if (
      form.price === ""
    ) {

      showToast(
        "Price wajib diisi",
        "warning"
      )

      return

    }

    if (
      Number(form.price) < 0
    ) {

      showToast(
        "Price tidak boleh minus",
        "warning"
      )

      return

    }

    if (
      Number(
        form.original_price
      ) < 0
    ) {

      showToast(
        "Original price tidak boleh minus",
        "warning"
      )

      return

    }

    if (
      Number(
        form.sort_order
      ) < 0
    ) {

      showToast(
        "Sort order tidak boleh minus",
        "warning"
      )

      return

    }

    let parsedOptions

try {

  parsedOptions =
    form.options.trim()

      ? JSON.parse(
          form.options
        )

      : {}

  if (
    Array.isArray(
      parsedOptions
    )
  ) {

    showToast(
      "Options harus object JSON",
      "warning"
    )

    return

  }

} catch {

  showToast(
    "Format JSON options tidak valid",
    "error"
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
        "Kopi Kenangan",

      options:
         parsedOptions,
    }

    setSaving(true)

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

    setSaving(false)

    if (result.success) {

      showToast(

        isCreateMode

          ? "Product berhasil dibuat"

          : "Product berhasil diupdate",

        "success"

      )

      onClose()

    } else {

      showToast(

        result.message ||
        "Gagal simpan product",

        "error"

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

            disabled={saving}
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

          <textarea
  className="
    admin-modal-input
    admin-modal-textarea
  "

  value={
    form.options
  }

  placeholder='
{
  "Temperature": [
    "Ice",
    "Hot"
  ]
}
  '

  onChange={(event) =>

    handleChange(
      "options",
      event.target.value
    )

  }
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

            disabled={saving}
          >
            Cancel
          </button>

          <button
            className="
              admin-modal-button
              admin-modal-button-save
            "

            onClick={handleSave}

            disabled={saving}
          >

            {
              saving
                ? "Saving..."
                : "Save"
            }

          </button>

        </div>

      </div>

    </div>

  )

}

export default ProductEditModal