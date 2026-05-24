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
    .eq("is_deleted", false)

    .order("sort_order", {
      ascending: true
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