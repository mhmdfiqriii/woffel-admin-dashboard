function normalizeBrandSlug(

  brand = ""

) {

  return brand

    .toLowerCase()

    .trim()

    .replaceAll(
      " ",
      "-"
    )

}

export default normalizeBrandSlug