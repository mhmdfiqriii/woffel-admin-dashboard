import {
  supabase
} from "../../lib/supabase"

async function deleteProduct(
  id
) {

  const { error } =
    await supabase

      .from("products")

      .delete()

      .eq("id", id)

  if (error) {

    console.log(error)

    return {
      success: false
    }

  }

  return {
    success: true
  }

}

export default deleteProduct