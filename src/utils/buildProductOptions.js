function buildProductOptions(
  product = {}
) {

  const manualOptions =

    typeof product.options ===
    "object"

      ? product.options

      : {}

  const temperature = []

  if (
    product.is_ice_available
  ) {

    temperature.push("Ice")

  }

  if (
    product.is_hot_available
  ) {

    temperature.push("Hot")

  }

  const size = ["Regular"]

  if (
    product.is_large_available
  ) {

    size.push("Large")

  }

  return {

    ...manualOptions,

    ...(temperature.length > 0 && {

      Temperature:
        temperature

    }),

    ...(size.length > 0 && {

      Size:
        size

    })

  }

}

export default buildProductOptions