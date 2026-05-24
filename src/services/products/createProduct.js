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