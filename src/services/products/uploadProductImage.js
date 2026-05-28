import {
  supabase
} from "../../lib/supabase"

async function uploadProductImage(
  file
) {

  // =====================
  // VALIDATION
  // =====================

  if (!file) {

    return {
      success: false,
      url: null,
      message: "File tidak ditemukan"
    }

  }

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
  ]

  if (
    !allowedTypes.includes(
      file.type
    )
  ) {

    return {
      success: false,
      url: null,
      message: "Format file tidak valid"
    }

  }

  // 2MB
  if (
    file.size >
    2 * 1024 * 1024
  ) {

    return {
      success: false,
      url: null,
      message: "File terlalu besar"
    }

  }

  // =====================
  // FILE NAME
  // =====================

  const extension =
    file.name.split(".").pop()

  const fileName =
    `${Date.now()}.${extension}`

  const filePath =
    `products/${fileName}`

  // =====================
  // UPLOAD
  // =====================

  const {
    error
  } = await supabase.storage

    .from("assets")

    .upload(
      filePath,
      file,
      {
        upsert: false
      }
    )

  if (error) {

    console.error(
      "UPLOAD ERROR:",
      error
    )

    return {
      success: false,
      url: null,
      message: "Upload gagal"
    }

  }

  // =====================
  // GET PUBLIC URL
  // =====================

  const {
    data
  } = supabase.storage

    .from("assets")

    .getPublicUrl(
      filePath
    )

  return {
    success: true,
    url: data.publicUrl,
    message: "Upload berhasil"
  }

}

export default uploadProductImage