import {
  supabase
} from "../../lib/supabase"

async function toggleAvailability({
  id,
  available
}) {

  const {
    data,
    error
  } = await supabase

    .from("products")

    .update({
      available
    })

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

export default toggleAvailability