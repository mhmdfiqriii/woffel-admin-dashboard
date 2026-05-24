import buildProductOptions
from "../../utils/buildProductOptions"

function normalizeProduct(
  product
) {

  return {

    ...product,

    image:
      product.image_url,

    originalPrice:
      product.original_price,

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
  Array.isArray(
    product.bundle_items
  )

    ? product.bundle_items

    : [],

    options:
      buildProductOptions(
        product
      )

  }

}

export default normalizeProduct