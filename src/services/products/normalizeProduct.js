function normalizeProduct(product) {

  return {

    ...product,

    image:
      product.image_url,

    originalPrice:
      product.original_price,

    is_available:
      product.is_available ?? true,

    options:
      typeof product.options ===
      "object"

        ? product.options

        : {}

  }

}

export default normalizeProduct