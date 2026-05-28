import {
  useState
} from "react"

import updateProduct
from "../../../services/products/updateProduct"

import createProduct
from "../../../services/products/createProduct"

import uploadProductImage
from "../../../services/products/uploadProductImage"

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
      product.sort_order ?? 999,

    is_available:
      product.is_available ?? true,

    is_hot_available:
      product.is_hot_available ?? true,

    is_ice_available:
      product.is_ice_available ?? true,

    is_large_available:
      product.is_large_available ?? false,

    bundle_type:
      product.bundle_type ?? false,

    bundle_items:
      JSON.stringify(
        product.bundle_items || [],
        null,
        2
      ),

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
    uploading,
    setUploading
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
  // HANDLE IMAGE UPLOAD
  // =====================

  async function handleImageUpload(
    event
  ) {

    const file =
      event.target.files?.[0]

    if (!file)
      return

    setUploading(true)

    const result =
      await uploadProductImage(
        file
      )

    setUploading(false)

    if (!result.success) {

      showToast(
        result.message ||
        "Upload gagal",
        "error"
      )

      return

    }

    handleChange(
      "image_url",
      result.url
    )

    showToast(
      "Image berhasil diupload",
      "success"
    )

  }

  // =====================
  // SAVE
  // =====================

  async function handleSave() {

    if (
      saving ||
      uploading
    ) return

    // =====================
    // BASIC VALIDATION
    // =====================

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

    // =====================
    // OPTIONS PARSE
    // =====================

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

    // =====================
    // BUNDLE PARSE
    // =====================

    let parsedBundleItems

    try {

      parsedBundleItems =

        form.bundle_items.trim()

          ? JSON.parse(
              form.bundle_items
            )

          : []

      if (
        !Array.isArray(
          parsedBundleItems
        )
      ) {

        showToast(
          "Bundle items harus array JSON",
          "warning"
        )

        return

      }

    } catch {

      showToast(
        "Format JSON bundle tidak valid",
        "error"
      )

      return

    }

    // =====================
    // PAYLOAD
    // =====================

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

      bundle_type:
        form.bundle_type,

      bundle_items:
        parsedBundleItems

    }

    // =====================
    // SAVE
    // =====================

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

    // =====================
    // RESULT
    // =====================

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

        {/* HEADER */}

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

            disabled={
              saving ||
              uploading
            }
          >
            ✕
          </button>

        </div>

        {/* FORM */}

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

            min="0"

            className="
              admin-modal-input
            "

            value={form.price}

            placeholder="
              Price
            "

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

          {/* IMAGE */}

          <div
            className="
              admin-upload-wrapper
            "
          >

            <input
              type="file"

              accept="
                image/png,
                image/jpeg,
                image/webp
              "

              onChange={
                handleImageUpload
              }

              disabled={
                uploading
              }
            />

            {
              form.image_url && (

                <img
                  src={
                    form.image_url
                  }

                  alt="preview"

                  className="
                    admin-product-preview
                  "
                />

              )
            }

            <input
              type="text"

              className="
                admin-modal-input
              "

              value={
                form.image_url
              }

              placeholder="
                Image URL otomatis
              "

              readOnly
            />

          </div>

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

          {/* OPTIONS */}

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

          {/* BUNDLE */}

          <label
            className="
              admin-modal-checkbox
            "
          >

            <span>
              Bundle Product
            </span>

            <input
              type="checkbox"

              checked={
                form.bundle_type
              }

              onChange={(event) =>

                handleChange(
                  "bundle_type",
                  event.target.checked
                )

              }
            />

          </label>

          <textarea
            className="
              admin-modal-input
              admin-modal-textarea
            "

            value={
              form.bundle_items
            }

            placeholder='
[
  {
    "product_id": 1,
    "qty": 2
  }
]
            '

            onChange={(event) =>

              handleChange(
                "bundle_items",
                event.target.value
              )

            }
          />

          {/* RULES */}

          <div className="
            admin-modal-rules
          ">

            <label
              className="
                admin-modal-checkbox
              "
            >

              <span>
                Hot Available
              </span>

              <input
                type="checkbox"

                checked={
                  form.is_hot_available
                }

                onChange={(event) =>

                  handleChange(
                    "is_hot_available",
                    event.target.checked
                  )

                }
              />

            </label>

            <label
              className="
                admin-modal-checkbox
              "
            >

              <span>
                Ice Available
              </span>

              <input
                type="checkbox"

                checked={
                  form.is_ice_available
                }

                onChange={(event) =>

                  handleChange(
                    "is_ice_available",
                    event.target.checked
                  )

                }
              />

            </label>

            <label
              className="
                admin-modal-checkbox
              "
            >

              <span>
                Large Available
              </span>

              <input
                type="checkbox"

                checked={
                  form.is_large_available
                }

                onChange={(event) =>

                  handleChange(
                    "is_large_available",
                    event.target.checked
                  )

                }
              />

            </label>

          </div>

          {/* AVAILABLE */}

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

        {/* ACTIONS */}

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

            disabled={
              saving ||
              uploading
            }
          >
            Cancel
          </button>

          <button
            className="
              admin-modal-button
              admin-modal-button-save
            "

            onClick={handleSave}

            disabled={
              saving ||
              uploading
            }
          >

            {
              saving
                ? "Saving..."
                : uploading
                  ? "Uploading..."
                  : "Save"
            }

          </button>

        </div>

      </div>

    </div>

  )

}

export default ProductEditModal