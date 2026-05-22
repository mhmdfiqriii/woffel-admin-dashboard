import {
  supabase
} from "../../lib/supabase"

async function uploadProductImage(
  file
) {

  const fileName =
    `${Date.now()}-${file.name}`

  const filePath =
    `products/${fileName}`

  const {
    error
  } = await supabase.storage

    .from("assets")

    .upload(
      filePath,
      file
    )

  if (error) {

    console.log(error)

    return {
      success: false,
      url: null
    }

  }

  const {
    data
  } = supabase.storage

    .from("assets")

    .getPublicUrl(filePath)

  return {
    success: true,
    url: data.publicUrl
  }

  const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp"
]

if (
  !allowedTypes.includes(file.type)
) {

  return {
    success: false,
    message: "Format file tidak valid"
  }

}

if (
  file.size > 2 * 1024 * 1024
) {

  return {
    success: false,
    message: "File terlalu besar"
  }

}

}

export default uploadProductImage