import {
  supabase
} from "../../lib/supabase"

async function fetchProducts() {

  const {
    data,
    error
  } = await supabase

    .from("products")

    .select("*")

    .order("created_at", {
      ascending: false
    })

  if (error) {

    console.log(error)

    return {
      success: false,
      data: []
    }

  }

  return {
    success: true,
    data
  }

}

export default fetchProducts