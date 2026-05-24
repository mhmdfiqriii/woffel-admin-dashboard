import {
  supabase
} from "../../lib/supabase"

function sanitizeUpdates(
  updates = {}
) {

  return {

    ...updates,

    name:
      updates.name
        ?.trim(),

    category:
      updates.category
        ?.trim(),

    brand:
      updates.brand
        ?.trim(),

    image_url:
      updates.image_url
        ?.trim(),

    price:
      updates.price === ""
        ? ""
        : Number(
            updates.price
          ),

    original_price:
      updates.original_price === ""
        ? ""
        : Number(
            updates.original_price
          ),

    sort_order:
      updates.sort_order === ""
        ? ""
        : Number(
            updates.sort_order
          ),

    options:
  typeof updates.options ===
  "object"

    ? updates.options

    : {},

    bundle_type:
  Boolean(
    updates.bundle_type
  ),

bundle_items:
  Array.isArray(
    updates.bundle_items
  )

    ? updates.bundle_items

    : [],

    is_hot_available:
  Boolean(
    updates.is_hot_available
  ),

is_ice_available:
  Boolean(
    updates.is_ice_available
  ),

is_large_available:
  Boolean(
    updates.is_large_available
  ),

    is_available:
      Boolean(
        updates.is_available
      )

  }

}

async function updateProduct({
  id,
  updates
}) {

  // =====================
  // VALIDATE ID
  // =====================

  if (!id) {

    return {
      success: false,
      data: null,
      message:
        "Product ID tidak ada"
    }

  }

  const sanitized =
    sanitizeUpdates(
      updates
    )

  // =====================
  // VALIDATION
  // =====================

  if (
    !sanitized.name
  ) {

    return {
      success: false,
      data: null,
      message:
        "Nama wajib diisi"
    }

  }

  if (
    !sanitized.category
  ) {

    return {
      success: false,
      data: null,
      message:
        "Category wajib diisi"
    }

  }

  if (
    isNaN(
      sanitized.price
    )
  ) {

    return {
      success: false,
      data: null,
      message:
        "Price tidak valid"
    }

  }

  if (
    sanitized.price < 0
  ) {

    return {
      success: false,
      data: null,
      message:
        "Price tidak boleh minus"
    }

  }

  if (
    sanitized.original_price < 0
  ) {

    return {
      success: false,
      data: null,
      message:
        "Original price tidak boleh minus"
    }

  }

  if (
    sanitized.sort_order < 0
  ) {

    return {
      success: false,
      data: null,
      message:
        "Sort order tidak boleh minus"
    }

  }

  // =====================
  // UPDATE
  // =====================

  const {
    data,
    error
  } = await supabase

    .from("products")

    .update(sanitized)

    .eq("id", id)

    .select()

    .single()

  if (error) {

    console.log(error)

    return {
      success: false,
      data: null,
      message:
        error.message
    }

  }

  return {
    success: true,
    data
  }

}

export default updateProduct