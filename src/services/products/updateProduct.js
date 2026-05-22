import {
  supabase
} from "../../lib/supabase"

async function updateProduct({
  id,
  updates
}) {

  const {
    data,
    error
  } = await supabase

    .from("products")

    .update(updates)

    .eq("id", id)

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

export default updateProduct