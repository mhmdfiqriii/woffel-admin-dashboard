import {
  supabase
} from "../../lib/supabase"

async function createProduct(
  productData
) {

  const {
    data,
    error
  } = await supabase

    .from("products")

    .insert(productData)

    .select()

    .single()

  if (error) {

    console.log(error)

    return {
      success: false,
      data: null
    }

  }

  return {
    success: true,
    data
  }

}

export default createProduct