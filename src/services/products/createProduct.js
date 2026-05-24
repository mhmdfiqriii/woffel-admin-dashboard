import {
  supabase
} from "../../lib/supabase"

function sanitizeProduct(
  product = {}
) {

  return {

    name:
      product.name
        ?.trim(),

    category:
      product.category
        ?.trim(),

    brand:
      product.brand
        ?.trim(),

    image_url:
      product.image_url
        ?.trim(),

    price:
      Number(product.price),

    original_price:
      Number(
        product.original_price
      ),

    sort_order:
      Number(
        product.sort_order
      ),

    options:
  typeof product.options ===
  "object"

    ? product.options

    : {},

    bundle_type:
  Boolean(
    product.bundle_type
  ),

bundle_items:
  Array.isArray(
    product.bundle_items
  )

    ? product.bundle_items

    : [],

    is_hot_available:
  Boolean(
    product.is_hot_available
  ),

is_ice_available:
  Boolean(
    product.is_ice_available
  ),

is_large_available:
  Boolean(
    product.is_large_available
  ),

    is_available:
      Boolean(
        product.is_available
      )

  }

}

async function createProduct(
  product
) {

  const sanitized =
    sanitizeProduct(
      product
    )

  // =====================
  // VALIDATION
  // =====================

  if (
    !sanitized.name
  ) {

    return {
      success: false,
      message:
        "Nama wajib diisi"
    }

  }

  if (
    !sanitized.category
  ) {

    return {
      success: false,
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
      message:
        "Price tidak valid"
    }

  }

  if (
    sanitized.price < 0
  ) {

    return {
      success: false,
      message:
        "Price tidak boleh minus"
    }

  }

  if (
    sanitized.original_price < 0
  ) {

    return {
      success: false,
      message:
        "Original price tidak boleh minus"
    }

  }

  if (
    sanitized.sort_order < 0
  ) {

    return {
      success: false,
      message:
        "Sort order tidak boleh minus"
    }

  }

  if (
  sanitized.original_price <
  sanitized.price
) {

  return {
    success: false,
    message:
      "Original price tidak boleh lebih kecil dari price"
  }

}

  const {
    data,
    error
  } = await supabase

    .from("products")

    .insert(sanitized)

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

export default createProduct